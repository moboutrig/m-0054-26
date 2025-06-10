import type { VercelRequest, VercelResponse } from '@vercel/node';
import cookie from 'cookie';


export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    // Set the cookie with an expiration date in the past to clear it
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      sameSite: 'Strict' as const,
      expires: new Date(0), // Set expiry to a past date
      secure: process.env.NODE_ENV === 'production', // Use Secure in production
    };

    res.setHeader('Set-Cookie', cookie.serialize('sessionToken', '', cookieOptions));
    return res.status(200).json({ success: true, message: 'Logout successful' });

  } catch (error) {
    console.error('Cookie Serialization Error during logout:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during logout' });
  }
}
