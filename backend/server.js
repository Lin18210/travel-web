const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Database setup
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    createTables();
  }
});

// Create tables
function createTables() {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  const createBookingsTable = `
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      destination TEXT NOT NULL,
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      guests INTEGER NOT NULL,
      total_price REAL NOT NULL,
      status TEXT DEFAULT 'confirmed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

  db.run(createUsersTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists');
    }
  });

  db.run(createBookingsTable, (err) => {
    if (err) {
      console.error('Error creating bookings table:', err.message);
    } else {
      console.log('Bookings table created or already exists');
    }
  });
}

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.run(sql, [username, email, hashedPassword], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Error creating user' });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: this.lastID, username, email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'User created successfully',
        token,
        user: {
          id: this.lastID,
          username,
          email
        }
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

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user by email
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  });
});

// Get current user profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  const sql = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
  db.get(sql, [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

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

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: req.user.id,
        username,
        email
      }
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

  // Get current user
  const sql = 'SELECT password FROM users WHERE id = ?';
  db.get(sql, [req.user.id], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // Verify current password
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    const updateSql = 'UPDATE users SET password = ? WHERE id = ?';
    db.run(updateSql, [hashedNewPassword, req.user.id], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error updating password' });
      }

      res.json({ message: 'Password updated successfully' });
    });
  });
});

// Create a new booking (after payment)
app.post('/api/bookings', authenticateToken, (req, res) => {
  const { destination, check_in, check_out, guests, total_price } = req.body;

  if (!destination || !check_in || !check_out || !guests || !total_price) {
    return res.status(400).json({ error: 'All booking fields are required' });
  }

  const sql = `INSERT INTO bookings (user_id, destination, check_in, check_out, guests, total_price) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [req.user.id, destination, check_in, check_out, guests, total_price], function(err) {
    if (err) {
      console.error('Error creating booking:', err.message);
      return res.status(500).json({ error: 'Error creating booking' });
    }
    res.status(201).json({
      message: 'Booking created successfully',
      booking: {
        id: this.lastID,
        user_id: req.user.id,
        destination,
        check_in,
        check_out,
        guests,
        total_price,
        status: 'confirmed',
        created_at: new Date().toISOString()
      }
    });
  });
});

// Get all bookings for the logged-in user
app.get('/api/bookings', authenticateToken, (req, res) => {
  const sql = `SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC`;
  db.all(sql, [req.user.id], (err, rows) => {
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
  // First, check if the booking exists and belongs to the user
  const selectSql = 'SELECT * FROM bookings WHERE id = ? AND user_id = ?';
  db.get(selectSql, [bookingId, req.user.id], (err, booking) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found or not authorized' });
    }
    // Delete the booking
    const deleteSql = 'DELETE FROM bookings WHERE id = ?';
    db.run(deleteSql, [bookingId], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Error deleting booking' });
      }
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

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
}); 