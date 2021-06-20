const axios = require('axios');

const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyAI1Yl8a7SDF89byRohNRRKQ_6SvGVGMGQ';

async function getCoordsForAddress(address) {
  return {
    lat: 25.612361,
    lng: 85.0816139
  };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
