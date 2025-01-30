import pool from '../db.js';
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const query = `
        SELECT p.*, u.id AS userId, u.name, u.profile_pic 
        FROM posts AS p 
        JOIN users AS u ON u.id = p.user_id
        LEFT JOIN relationships AS r ON p.user_id = r.followed_user_id AND r.follower_user_id = $1
        WHERE p.user_id = $1 OR r.follower_user_id = $1
        ORDER BY p.created_at DESC
      `;
      const { rows } = await pool.query(query, [userInfo.id]);
      res.status(200).json(rows);
    } catch (err) {
      console.error('Error al obtener los posts:', err);
      res.status(500).json({ message: 'Error al obtener los posts', error: err });
    }
  });
};

export const addPost = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const query = `
        INSERT INTO posts ( description, img, created_at, user_id) 
        VALUES ($1, $2, $3, $4)
      `;

      const values = [
        req.body.description,
        req.body.img,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id
      ];
      await pool.query(query, values);
      res.status(200).json("Post has been created");
    } catch (err) {
      console.error('Error al crear el post:', err);
      res.status(500).json({ message: 'Error al crear el post', error: err });
    }
  });
};

export const getPostById = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const query = `
        SELECT 
          p.*, 
          u.id AS user_id, 
          u.name, 
          u.profile_pic,
          (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS likes,
          EXISTS (SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) AS is_liked
        FROM posts AS p
        JOIN users AS u ON u.id = p.user_id
        WHERE p.id = $2
      `;
      const { rows } = await pool.query(query, [userInfo.id, req.params.id]);
      
      if (rows.length === 0) {
        return res.status(404).json({ message: "Post no encontrado" });
      }
      
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error('Error al obtener el post:', err);
      res.status(500).json({ message: "Error del servidor" });
    }
  });
};