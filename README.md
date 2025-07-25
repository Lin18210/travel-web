# Travel Booking Website with Authentication

A modern travel booking website with user authentication, built with HTML, CSS, JavaScript, Node.js, and SQLite.

## Features

### Authentication System
- **User Registration**: Create new accounts with username, email, and password
- **User Login**: Secure login with email and password
- **Password Security**: Bcrypt hashing and password strength validation
- **JWT Tokens**: Secure authentication tokens with 24-hour expiration
- **Profile Management**: Update user information and change passwords
- **Session Management**: Remember me functionality and secure logout

### User Interface
- **Modern Design**: Responsive design with beautiful UI/UX
- **Authentication Pages**: Dedicated login and signup pages
- **User Profile**: Comprehensive profile management with tabs
- **Navigation**: Dynamic navigation based on authentication status
- **Password Strength**: Real-time password strength indicator
- **Form Validation**: Client-side and server-side validation

### Backend Features
- **SQLite Database**: Lightweight database for user storage
- **Express.js Server**: RESTful API endpoints
- **Security**: Password hashing, JWT tokens, and input validation
- **CORS Support**: Cross-origin resource sharing enabled
- **Error Handling**: Comprehensive error handling and user feedback

## Project Structure

```
thl thl final project/
├── backend/
│   ├── server.js          # Express.js server with authentication
│   ├── package.json       # Backend dependencies
│   └── users.db          # SQLite database (created automatically)
├── frontend/
│   ├── index.html         # Home page
│   ├── login.html         # Login page
│   ├── signup.html        # Signup page
│   ├── profile.html       # User profile page
│   ├── styles.css         # Main styles
│   ├── auth.css           # Authentication page styles
│   ├── profile.css        # Profile page styles
│   ├── script.js          # Main JavaScript
│   ├── auth.js            # Authentication JavaScript
│   ├── profile.js         # Profile page JavaScript
│   └── assets/            # Images and media files
└── README.md              # This file
```

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Open the website:**
   - If using the backend server: Visit `http://localhost:3000`
   - If running frontend only: Open `index.html` in your browser

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires authentication)
- `PUT /api/auth/profile` - Update user profile (requires authentication)
- `PUT /api/auth/change-password` - Change password (requires authentication)

### Frontend Routes
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/profile` - User profile page

## Usage

### Creating an Account
1. Click "Sign Up" in the navigation
2. Fill in your username, email, and password
3. Accept the terms and conditions
4. Click "Create Account"

### Logging In
1. Click "Login" in the navigation
2. Enter your email and password
3. Optionally check "Remember me"
4. Click "Sign In"

### Managing Profile
1. Click on your username in the navigation
2. Select "Profile" from the dropdown
3. Use the tabs to navigate between:
   - **Profile**: Update personal information
   - **Security**: Change password and security settings
   - **My Bookings**: View and manage bookings
   - **Favorites**: Manage saved destinations

## Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Tokens**: Secure authentication tokens
- **Input Validation**: Both client-side and server-side validation
- **SQL Injection Protection**: Parameterized queries
- **CORS Protection**: Configured for security
- **Password Strength**: Real-time password strength checking

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Variables

Create a `.env` file in the backend directory (optional):

```env
PORT=3000
JWT_SECRET=your-secret-key-change-in-production
```

## Development

### Adding New Features
1. Backend: Add new routes in `server.js`
2. Frontend: Create new HTML pages and corresponding CSS/JS files
3. Update navigation in all HTML files

### Styling
- Main styles: `frontend/styles.css`
- Authentication styles: `frontend/auth.css`
- Profile styles: `frontend/profile.css`

### JavaScript
- Main functionality: `frontend/script.js`
- Authentication: `frontend/auth.js`
- Profile management: `frontend/profile.js`

## Troubleshooting

### Common Issues

1. **Server won't start:**
   - Check if Node.js is installed
   - Run `npm install` in the backend directory
   - Check if port 3000 is available

2. **Database errors:**
   - The SQLite database is created automatically
   - Check file permissions in the backend directory

3. **Authentication not working:**
   - Ensure the backend server is running
   - Check browser console for errors
   - Verify API endpoints are accessible

4. **CORS errors:**
   - The backend includes CORS configuration
   - Ensure you're accessing via `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please open an issue in the repository.
# travel-web
# travel-web
# travel-web
