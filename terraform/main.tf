provider "aws" {
  region = "ap-south-1"
}

resource "aws_security_group" "app_sg" {
  name = "place-tracker-sg"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami                    = "ami-03bb6d83c60fc5f7c"
  instance_type          = "t3.micro"
  key_name               = "place-tracker-app-key"
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = {
    Name = "place-tracker-server"
  }
}

output "public_ip" {
  value = aws_instance.app_server.public_ip
}