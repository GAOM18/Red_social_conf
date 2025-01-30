import pool from '../db.js';
import jwt from 'jsonwebtoken';

export const getLikes = async (req, res) => {
  const query = `
    SELECT user_id FROM likes WHERE post_id = $1
  `;

  try {
    const { rows } = await pool.query(query, [req.query.post_id]);
    res.status(200).json(rows.map(like => like.user_id));
  } catch (err) {
    console.error('Error al obtener los likes:', err);
    res.status(500).json({ message: 'Error al obtener los likes', error: err });
  }
};
