// Dashboard controller for role‑based data
import { pool } from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

ddotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

export async function getDashboardData(req, res) {
  try {
    const { role } = req.params; // role from URL e.g., /api/dashboard/farmer
    // Ensure the token role matches the requested role
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: 'Access denied for this role' });
    }

    // Simple placeholder data – replace with real queries later
    let data = {};
    switch (role) {
      case 'admin':
        data = { message: 'Admin dashboard', stats: { users: 0, farms: 0 } };
        break;
      case 'farmer':
        data = { message: 'Farmer dashboard', fields: [] };
        break;
      case 'customer':
        data = { message: 'Customer dashboard', orders: [] };
        break;
      case 'farm_manager':
        data = { message: 'Farm Manager dashboard', tasks: [] };
        break;
      default:
        return res.status(400).json({ error: 'Unknown role' });
    }
    res.json(data);
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Server error' });
  }
}
