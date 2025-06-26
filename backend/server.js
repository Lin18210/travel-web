const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key-change-in-production';

// SQLite connection
const db = new sqlite3.Database(path.join(__dirname, 'users.db'), (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Create tables if not exist
function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
  const createBookingsTable = `
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      destination TEXT NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      guests INTEGER NOT NULL,
      total_price DECIMAL(10,2) NOT NULL,
      image TEXT,
      status TEXT DEFAULT 'confirmed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`;
  
  db.run(createUsersTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table ready');
    }
  });

  db.run(createBookingsTable, (err) => {
    if (err) {
      console.error('Error creating bookings table:', err.message);
    } else {
      console.log('Bookings table ready');
    }
  });
}
createTables();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    
    db.run(sql, [username, email, hashedPassword], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Error creating user' });
      }
      
      const user = {
        id: this.lastID,
        username,
        email
      };
      
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      res.status(201).json({
        message: 'User created successfully',
        token,
        user
      });
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid email or password' });
    
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  });
});

// Get current user profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  const sql = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
  db.get(sql, [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  });
});

// Update user profile
app.put('/api/auth/profile', authenticateToken, (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }
  
  const sql = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
  db.run(sql, [username, email, req.user.id], function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
      return res.status(500).json({ error: 'Error updating profile' });
    }
    
    const user = {
      id: req.user.id,
      username,
      email
    };
    
    res.json({
      message: 'Profile updated successfully',
      user
    });
  });
});

// Change password
app.put('/api/auth/change-password', authenticateToken, (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }
  
  const sql = 'SELECT password FROM users WHERE id = ?';
  db.get(sql, [req.user.id], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Current password is incorrect' });
    
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updateSql = 'UPDATE users SET password = ? WHERE id = ?';
    
    db.run(updateSql, [hashedNewPassword, req.user.id], (err) => {
      if (err) return res.status(500).json({ error: 'Error updating password' });
      res.json({ message: 'Password updated successfully' });
    });
  });
});

// Create a new booking (after payment)
app.post('/api/bookings', authenticateToken, async (req, res) => {
  const { destination, check_in, check_out, guests, total_price, image } = req.body;
  if (!destination || !check_in || !check_out || !guests || !total_price) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = 'INSERT INTO bookings (user_id, destination, check_in, check_out, guests, total_price, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
  try {
    const result = await db.run(sql, [req.user.id, destination, check_in, check_out, guests, total_price, image]);
    res.status(201).json({ message: 'Booking created successfully', booking: { id: result.lastID } });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating booking' });
  }
});

// Get all bookings for a user
app.get('/api/bookings', authenticateToken, async (req, res) => {
  const sql = 'SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC';
  try {
    const result = await db.all(sql, [req.user.id]);
    res.json({ bookings: result });
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Get a single booking by ID
app.get('/api/bookings/:id', authenticateToken, async (req, res) => {
  const sql = 'SELECT * FROM bookings WHERE id = ? AND user_id = ?';
  try {
    const result = await db.get(sql, [req.params.id, req.user.id]);
    const booking = result;
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ booking });
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching booking' });
  }
});

// Serve frontend routes
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/signup.html'));
});
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/profile.html'));
});
// Catch all other routes and serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 