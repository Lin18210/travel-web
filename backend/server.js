const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// MySQL connection
const db = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'travel_booking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Create tables if not exist
function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `;
  const createBookingsTable = `
    CREATE TABLE IF NOT EXISTS bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      destination VARCHAR(255) NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      guests INT NOT NULL,
      total_price DECIMAL(10,2) NOT NULL,
      image VARCHAR(512),
      status VARCHAR(32) DEFAULT 'confirmed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `;
  db.query(createUsersTable, (err) => {
    if (err) console.error('Error creating users table:', err.message);
    else console.log('Users table ready');
  });
  db.query(createBookingsTable, (err) => {
    if (err) console.error('Error creating bookings table:', err.message);
    else console.log('Bookings table ready');
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
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Error creating user' });
      }
      const token = jwt.sign(
        { id: result.insertId, username, email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      res.status(201).json({
        message: 'User created successfully',
        token,
        user: { id: result.insertId, username, email }
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
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    const user = results[0];
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
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    const user = results[0];
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
  db.query(sql, [username, email, req.user.id], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
      return res.status(500).json({ error: 'Error updating profile' });
    }
    res.json({
      message: 'Profile updated successfully',
      user: { id: req.user.id, username, email }
    });
  });
});

// Change password
app.put('/api/auth/change-password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters' });
  }
  const sql = 'SELECT password FROM users WHERE id = ?';
  db.query(sql, [req.user.id], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    const user = results[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Current password is incorrect' });
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updateSql = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(updateSql, [hashedNewPassword, req.user.id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error updating password' });
      res.json({ message: 'Password updated successfully' });
    });
  });
});

// Create a new booking (after payment)
app.post('/api/bookings', authenticateToken, (req, res) => {
  const { destination, check_in, check_out, guests, total_price, image } = req.body;
  if (!destination || !check_in || !check_out || !guests || !total_price) {
    return res.status(400).json({ error: 'All booking fields are required' });
  }
  const sql = `INSERT INTO bookings (user_id, destination, check_in, check_out, guests, total_price, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [req.user.id, destination, check_in, check_out, guests, total_price, image || null], (err, result) => {
    if (err) {
      console.error('Error creating booking:', err.message);
      return res.status(500).json({ error: 'Error creating booking' });
    }
    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        id: result.insertId,
        user_id: req.user.id,
        destination,
        check_in,
        check_out,
        guests,
        total_price,
        image: image || null,
        status: 'confirmed',
        created_at: new Date().toISOString()
      }
    });
  });
});

// Get all bookings for the logged-in user
app.get('/api/bookings', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC`;
  db.query(sql, [req.user.id], (err, rows) => {
    if (err) {
      console.error('Error fetching bookings:', err.message);
      return res.status(500).json({ error: 'Error fetching bookings' });
    }
    res.json({ bookings: rows });
  });
});

// Delete a booking by ID (for the logged-in user)
app.delete('/api/bookings/:id', authenticateToken, (req, res) => {
  const bookingId = req.params.id;
  const selectSql = 'SELECT * FROM bookings WHERE id = ? AND user_id = ?';
  db.query(selectSql, [bookingId, req.user.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    const booking = results[0];
    if (!booking) return res.status(404).json({ error: 'Booking not found or not authorized' });
    const deleteSql = 'DELETE FROM bookings WHERE id = ?';
    db.query(deleteSql, [bookingId], (err, result) => {
      if (err) return res.status(500).json({ error: 'Error deleting booking' });
      res.json({ message: 'Booking deleted successfully' });
    });
  });
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