import fs from 'fs';
import path from 'path';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

// --- Environment Variables ---
// IMPORTANT: Use a strong, unique secret from environment variables in production!
// A long, random string is recommended for SESSION_SECRET.
const SESSION_SECRET = process.env.SESSION_SECRET;


const dbPath = path.resolve(process.cwd(), 'api/db.json'); // Assuming api/db.json is at the root of the project for this example

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Check if essential environment variables are set, especially for POST requests
  if (req.method === 'POST' && !SESSION_SECRET) {
    console.error('CRITICAL: Missing SESSION_SECRET in environment variables for POST /api/content.');
    return res.status(500).json({ message: 'Server configuration error. Please contact administrator.' });
  }

  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
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
  } else if (req.method === 'POST') {
    try {
      const cookies = cookie.parse(req.headers.cookie || '');
      const token = cookies.sessionToken;

      if (!token) {
        return res.status(403).json({ message: 'Not authorized: No session token provided.' });
      }

      jwt.verify(token, SESSION_SECRET, (err, decoded) => {
        if (err) {
          console.error('JWT Verification Error:', err.message);
          return res.status(403).json({ message: 'Not authorized: Invalid or expired token.' });
        }

        // Token is valid, proceed to update content
        // console.log('JWT Decoded:', decoded); // For debugging, if needed

        const newData = req.body;
        if (!newData || Object.keys(newData).length === 0) {
          return res.status(400).json({ message: 'No data provided in request body or data is empty.' });
        }

        try {
          fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2), 'utf-8');
          return res.status(200).json({ message: 'Content updated successfully' });
        } catch (writeError) {
          console.error('Error writing to db.json:', writeError);
          return res.status(500).json({ message: 'Error updating content on the server.' });
        }
      });
    } catch (error) { // Catch errors from cookie.parse or other unexpected issues
      console.error('Error processing POST request:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
