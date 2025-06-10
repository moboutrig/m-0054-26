import type { NextApiRequest, NextApiResponse } from 'next'; // Using Next.js types for better illustration
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

// --- Environment Variables ---
// IMPORTANT: Set CMS_PASSWORD via environment variables in production!
// This default is for development convenience ONLY and is insecure for production.
const CMS_PASSWORD = process.env.CMS_PASSWORD || 'DEFAULT_PASSWORD';

// IMPORTANT: Use a strong, unique secret from environment variables in production!
// This default is for development convenience ONLY and is insecure for production.
// A long, random string is recommended for SESSION_SECRET.
const SESSION_SECRET = process.env.SESSION_SECRET || 'YOUR_REALLY_SECRET_KEY_MUST_BE_LONG_AND_RANDOM_DEV_ONLY';

// Used to determine if 'Secure' flag should be set on cookies.
const NODE_ENV = process.env.NODE_ENV || 'development';

// --- Types ---
type Data = {
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
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
