import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

ddotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
