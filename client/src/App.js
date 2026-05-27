import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
        <footer style="background:#111; color:#fff; padding:20px 0; text-align:center; margin-top:40px;">
          <div style="max-width:1000px; margin:auto; padding:0 20px;">
            <h3 style="margin:0 0 10px;">Place Tracker App</h3>

            <p style="margin:0 0 15px; font-size:14px; color:#bbb;">
              Track and manage your favorite places easily.
            </p>

            <div style="margin-bottom:15px;">
              <a
                href="/"
                style="color:#fff; margin:0 10px; text-decoration:none;"
              >
                Home
              </a>
              <a
                href="/about"
                style="color:#fff; margin:0 10px; text-decoration:none;"
              >
                About
              </a>
              <a
                href="/contact"
                style="color:#fff; margin:0 10px; text-decoration:none;"
              >
                Contact
              </a>
            </div>

            <div style="font-size:13px; color:#888;">
              © 2026 Place Tracker. All rights reserved.
            </div>
          </div>
        </footer>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
