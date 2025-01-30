import pool from '../db.js';
import jwt from "jsonwebtoken";


export const getComments = async (req,res)=>{

  const postId = req.query.post_id;

  if (!postId || isNaN(postId)) {
    return res.status(400).json({ message: 'Invalid post_id' });
  }
    try {
      const query = `
        SELECT c.*, u.id as user_id, u.name, u.profile_pic 
        FROM comments AS c 
        JOIN users AS u ON u.id = c.user_id
        WHERE c.post_id = $1
        ORDER BY c.created_at DESC
      `;
      const { rows } = await pool.query(query, [postId]);
      res.status(200).json(rows);
    } catch (err) {
      console.error('Error al obtener los posts:', err);
      res.status(500).json({ message: 'Error al obtener los posts', error: err });
    }
  };


  export const addComment = async (req, res) => {
    const token = req.cookies.accessToken;
  
    // Validar si el token está presente
    if (!token) {
      return res.status(401).json({ message: 'No has iniciado sesión' });
    }
  
    jwt.verify(token, "secretkey", async (err, userInfo) => {
      if (err) {
        return res.status(403).json({ message: 'Token no válido' });
      }
  
      const { description, post_id } = req.body;
  
      // Validar los datos del cuerpo de la solicitud
      if (!description || !post_id || isNaN(post_id)) {
        return res.status(400).json({ message: 'Invalid desc or post_id' });
      }
  
      try {
        const query = `
          INSERT INTO comments (description, post_id, user_id, created_at) 
          VALUES ($1, $2, $3, NOW())
        `;
        const values = [description, post_id, userInfo.id];
  
        await pool.query(query, values);
        res.status(200).json({ message: 'El comentario ha sido creado' });
      } catch (err) {
        console.error('Error al crear el comentario:', err);
        res.status(500).json({ message: 'Error al crear el comentario', error: err });
      }
    });
  };
