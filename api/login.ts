import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

// --- Environment Variables ---
// IMPORTANT: Set CMS_PASSWORD via environment variables in production!
const CMS_PASSWORD = process.env.CMS_PASSWORD;

// IMPORTANT: Use a strong, unique secret from environment variables in production!
// A long, random string is recommended for SESSION_SECRET.
const SESSION_SECRET = process.env.SESSION_SECRET;

// Used to determine if 'Secure' flag should be set on cookies.
const NODE_ENV = process.env.NODE_ENV || 'development';


export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Check if essential environment variables are set
  if (!CMS_PASSWORD || !SESSION_SECRET) {
    console.error('CRITICAL: Missing CMS_PASSWORD or SESSION_SECRET in environment variables.');
    return res.status(500).json({ success: false, message: 'Server configuration error. Please contact administrator.' });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ success: false, message: 'Password is required' });
  }

  if (password === CMS_PASSWORD) {
    try {
      // Password matches, generate JWT
      const token = jwt.sign(
        { userId: 'admin' }, // Example payload, customize as needed
        SESSION_SECRET,
        { expiresIn: '1h' } // Token expiration time
      );

      // Set JWT as an HttpOnly cookie
      const cookieOptions = {
        httpOnly: true,
        path: '/',
        sameSite: 'Strict' as const, // Explicitly type as 'Strict'
        maxAge: 60 * 60, // 1 hour in seconds
        secure: NODE_ENV === 'production', // Use Secure in production
      };

      res.setHeader('Set-Cookie', cookie.serialize('sessionToken', token, cookieOptions));
      return res.status(200).json({ success: true, message: 'Login successful' });

    } catch (error) {
      console.error('JWT Signing or Cookie Serialization Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error during login' });
    }
  } else {
    // Password does not match
    return res.status(401).json({ success: false, message: 'Invalid password' });
  }
}
