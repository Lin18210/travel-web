const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// PostgreSQL connection
const pool = new Pool({
  user: process.env.PGUSER || 'your_user',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'travel_booking',
  password: process.env.PGPASSWORD || 'your_password',
  port: process.env.PGPORT || 5432,
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Create tables if not exist
async function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  const createBookingsTable = `
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      destination VARCHAR(255) NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      guests INTEGER NOT NULL,
      total_price NUMERIC(10,2) NOT NULL,
      image VARCHAR(512),
      status VARCHAR(32) DEFAULT 'confirmed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createUsersTable);
    console.log('Users table ready');
    await pool.query(createBookingsTable);
    console.log('Bookings table ready');
  } catch (err) {
    console.error('Error creating tables:', err.message);
  }
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
    const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
    try {
      const result = await pool.query(sql, [username, email, hashedPassword]);
      const user = result.rows[0];
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      res.status(201).json({
        message: 'User created successfully',
        token,
        user: { id: user.id, username: user.username, email: user.email }
      });
    } catch (err) {
      if (err.code === '23505') {
        return res.status(400).json({ error: 'Username or email already exists' });
      }
      return res.status(500).json({ error: 'Error creating user' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const sql = 'SELECT * FROM users WHERE email = $1';
  try {
    const result = await pool.query(sql, [email]);
    const user = result.rows[0];
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
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
});

// Get current user profile
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  const sql = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
  try {
    const result = await pool.query(sql, [req.user.id]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: 'Database error' });
  }
});

// Update user profile
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }
  const sql = 'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email';
  try {
    const result = await pool.query(sql, [username, email, req.user.id]);
    const user = result.rows[0];
    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    return res.status(500).json({ error: 'Error updating profile' });
  }
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
  const sql = 'SELECT password FROM users WHERE id = $1';
  try {
    const result = await pool.query(sql, [req.user.id]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Current password is incorrect' });
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const updateSql = 'UPDATE users SET password = $1 WHERE id = $2';
    await pool.query(updateSql, [hashedNewPassword, req.user.id]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error updating password' });
  }
});

// Create a new booking (after payment)
app.post('/api/bookings', authenticateToken, async (req, res) => {
  const { destination, check_in, check_out, guests, total_price, image } = req.body;
  if (!destination || !check_in || !check_out || !guests || !total_price) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const sql = `INSERT INTO bookings (user_id, destination, check_in, check_out, guests, total_price, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  try {
    const result = await pool.query(sql, [req.user.id, destination, check_in, check_out, guests, total_price, image]);
    res.status(201).json({ message: 'Booking created successfully', booking: result.rows[0] });
  } catch (err) {
    return res.status(500).json({ error: 'Error creating booking' });
  }
});

// Get all bookings for a user
app.get('/api/bookings', authenticateToken, async (req, res) => {
  const sql = 'SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC';
  try {
    const result = await pool.query(sql, [req.user.id]);
    res.json({ bookings: result.rows });
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Get a single booking by ID
app.get('/api/bookings/:id', authenticateToken, async (req, res) => {
  const sql = 'SELECT * FROM bookings WHERE id = $1 AND user_id = $2';
  try {
    const result = await pool.query(sql, [req.params.id, req.user.id]);
    const booking = result.rows[0];
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