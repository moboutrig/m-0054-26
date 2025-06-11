// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Environment Variables (from .env.local via dotenv) ---
const CMS_PASSWORD = process.env.CMS_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;
const NODE_ENV = process.env.NODE_ENV || 'development';

// --- Middleware ---
// Configure CORS for your Vite frontend development server
app.use(cors({
  origin: 'http://localhost:5173', // Adjust if your frontend runs on a different port
  credentials: true, // Important for cookies
}));
app.use(express.json()); // For parsing application/json
app.use(cookieParser()); // For parsing cookies

// --- Helper ---
const dbPath = path.resolve(__dirname, 'api/db.json');

// --- Basic Environment Variable Check ---
if (!CMS_PASSWORD || !SESSION_SECRET) {
  console.error('CRITICAL ERROR: CMS_PASSWORD or SESSION_SECRET is not defined in environment variables.');
  console.log('Please ensure .env.local is set up correctly or environment variables are provided.');
  process.exit(1); // Exit if critical env vars are missing
}

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'public/uploads/';
    // Ensure the directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// --- Middleware for Authentication ---
const checkAuth = (req, res, next) => {
  const token = req.cookies.sessionToken;
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated: No token provided' });
  }
  try {
    // Verify the token using the SESSION_SECRET
    // SESSION_SECRET is already loaded from process.env at the top
    const decoded = jwt.verify(token, SESSION_SECRET);
    // req.user = decoded; // Optional: attach decoded payload to request for further use
    next(); // Token is valid, proceed to the route handler
  } catch (error) {
    // Token is invalid (e.g., expired, wrong signature)
    console.warn('JWT Verification Error (checkAuth):', error.message);
    return res.status(403).json({ message: 'Not authenticated: Invalid or expired token' });
  }
};

// --- API Routes (Translated from /api/*.ts files) ---

// 1. /api/content (GET and POST)
app.get('/api/content', (req, res) => {
  try {
    if (!fs.existsSync(dbPath)) {
      return res.status(404).json({ message: 'Database file not found.' });
    }
    const fileContent = fs.readFileSync(dbPath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    return res.status(200).json(jsonData);
  } catch (error) {
    console.error('Error reading or parsing db.json:', error);
    return res.status(500).json({ message: 'Error fetching content' });
  }
});

app.post('/api/content', checkAuth, (req, res) => {
  // If checkAuth passes, we are authenticated.
  try {
    const newData = req.body;
    if (!newData || Object.keys(newData).length === 0) {
      return res.status(400).json({ message: 'No data provided in request body or data is empty.' });
    }

    fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2), 'utf-8');
    return res.status(200).json({ message: 'Content updated successfully' });
  } catch (writeError) {
    console.error('Error writing to db.json:', writeError);
    return res.status(500).json({ message: 'Error updating content on the server.' });
  }
});

// 2. /api/login (POST)
app.post('/api/login', (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  if (password === CMS_PASSWORD) {
    try {
      const token = jwt.sign(
        { userId: 'admin' }, // Example payload
        SESSION_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('sessionToken', token, {
        httpOnly: true,
        path: '/',
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds for Express cookie
        secure: NODE_ENV === 'production',
      });
      return res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
      console.error('JWT Signing or Cookie Serialization Error (/api/login):', error);
      return res.status(500).json({ success: false, message: 'Internal server error during login' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// 3. /api/verify-auth (GET)
app.get('/api/verify-auth', (req, res) => {
  try {
    const token = req.cookies.sessionToken;
    if (!token) {
      return res.status(200).json({ authenticated: false, message: 'No session token found' });
    }

    jwt.verify(token, SESSION_SECRET, (err, decoded) => {
      if (err) {
        // Don't log as critical error, token might just be expired or invalid
        console.warn('JWT Verification Warning (/api/verify-auth):', err.message);
        return res.status(200).json({ authenticated: false, message: 'Session token is invalid or expired' });
      }
      return res.status(200).json({ authenticated: true });
    });
  } catch (error) {
    console.error('Error in /api/verify-auth:', error);
    return res.status(500).json({ authenticated: false, message: 'Internal server error during authentication check' });
  }
});

// 4. /api/logout (POST)
app.post('/api/logout', (req, res) => {
  try {
    res.cookie('sessionToken', '', {
      httpOnly: true,
      path: '/',
      sameSite: 'Strict',
      expires: new Date(0), // Expire immediately
      secure: NODE_ENV === 'production',
    });
    return res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Error in /api/logout:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during logout' });
  }
});

// 5. /api/upload (POST)
app.post('/api/upload', checkAuth, upload.single('file'), (req, res) => {
  try {
    if (req.file) {
      res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
    } else {
      res.status(400).json({ message: 'File upload failed: No file provided or upload error.' });
    }
  } catch (error) {
    console.error('Error in /api/upload:', error);
    res.status(500).json({ message: 'Internal server error during file upload.' });
  }
});

// Serve static files from public/uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Local API server listening on http://localhost:${PORT}`);
  console.log('Make sure your frontend (e.g., Vite on port 5173) is configured to proxy /api requests to this server.');
});
