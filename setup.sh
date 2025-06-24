#!/bin/bash

echo "========================================"
echo "Travel Booking Website Setup"
echo "========================================"
echo

echo "Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js is installed."
echo

echo "Setting up backend..."
cd backend
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies!"
    exit 1
fi

echo
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo
echo "To start the server:"
echo "1. Navigate to the backend directory: cd backend"
echo "2. Start the server: npm start"
echo "3. Open your browser to: http://localhost:3000"
echo
echo "For development with auto-restart:"
echo "npm run dev" 