import pool from '../db.js';
import jwt from "jsonwebtoken";

export const updateUserProfilePic = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const query = `
        UPDATE users 
        SET profile_pic = $1 
        WHERE id = $2
      `;
      const values = [
        req.body.profile_pic,
        userInfo.id
      ];
      await pool.query(query, values);
      res.status(200).json("Profile picture updated");
    } catch (err) {
      console.error('Error al actualizar la foto de perfil:', err);
      res.status(500).json({ message: 'Error al actualizar la foto de perfil', error: err });
    }
  });
};