@echo off
echo ========================================
echo Travel Booking Website Setup
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed.
echo.

echo Setting up backend...
cd backend
echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the server:
echo 1. Navigate to the backend directory: cd backend
echo 2. Start the server: npm start
echo 3. Open your browser to: http://localhost:3000
echo.
echo For development with auto-restart:
echo npm run dev
echo.
pause 