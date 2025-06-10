import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

// --- Environment Variables ---
// IMPORTANT: Use a strong, unique secret from environment variables in production!
// A long, random string is recommended for SESSION_SECRET.
const SESSION_SECRET = process.env.SESSION_SECRET;


export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Check if essential environment variables are set
  if (!SESSION_SECRET) {
    console.error('CRITICAL: Missing SESSION_SECRET in environment variables for /api/verify-auth.');
    return res.status(500).json({ authenticated: false, message: 'Server configuration error. Please contact administrator.' });
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ authenticated: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.sessionToken;

    if (!token) {
      return res.status(200).json({ authenticated: false, message: 'No session token found' });
    }

    jwt.verify(token, SESSION_SECRET, (err, decoded) => {
      if (err) {
        console.error('JWT Verification Error:', err.message);
        // Consider different responses based on error type, e.g., TokenExpiredError
        return res.status(200).json({ authenticated: false, message: 'Session token is invalid or expired' });
      }
      // Token is valid
      // Optionally, you can use the decoded payload here if needed
      // console.log('Decoded JWT:', decoded);
      return res.status(200).json({ authenticated: true });
    });

  } catch (error) {
    console.error('Error parsing cookies or during verification:', error);
    return res.status(500).json({ authenticated: false, message: 'Internal server error during authentication check' });
  }
}
