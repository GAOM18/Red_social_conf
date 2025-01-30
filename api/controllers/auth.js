import bcrypt from 'bcryptjs';
import pool from '../db.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  // Verificar si el usuario ya existe
  const userExistsQuery = 'SELECT * FROM users WHERE email = $1';
  const userExistsValues = [req.body.email];

  pool.query(userExistsQuery, userExistsValues, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error al verificar el usuario", error: err });
    }

    if (result.rows.length > 0) {
      return res.status(409).json({ message: "El usuario ya existe." });
    }

    // Si el usuario no existe, crear uno nuevo
    try {
      // Hashear la contraseña
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      // Preparar la consulta para insertar el nuevo usuario
      const insertQuery = `
        INSERT INTO users (username, email, password, name)
        VALUES ($1, $2, $3, $4) RETURNING *`; // `RETURNING *` devuelve los datos insertados

      const values = [req.body.username, req.body.email, hashedPassword, req.body.name];

      pool.query(insertQuery, values, (err, data) => {
        if (err) {
          console.error(err); // Loguear cualquier error
          return res.status(500).json({ message: "Error al crear el usuario", error: err });
        }

        // Si el usuario es creado con éxito
        return res.status(201).json({ message: "Usuario creado exitosamente", user: data.rows[0] });
      });
    } catch (error) {
      // Manejo de errores en el proceso de hash de la contraseña
      console.error(error); // Loguear el error para depuración
      return res.status(500).json({ message: "Error en el proceso de creación del usuario", error });
    }
  });
};



export const login = async (req, res) => {
  const userQuery = 'SELECT * FROM users WHERE username = $1';
  
  pool.query(userQuery, [req.body.username], (err, data) => {
    if (err) {
      console.error(err); // Loguear cualquier error
      return res.status(500).json({ message: "Error al verificar el usuario", error: err });
    }

    if (data.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = data.rows[0];
    const checkPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!checkPassword) {
      return res.status(400).json({ message: "Contraseña  incorrecta!" });
    }

    const token = jwt.sign({ id: user.id }, "secretkey");

    const { password, ...others } = user;

    res.cookie("accessToken", token, {
      httpOnly: true,
    });

    return res.status(200).json({ message: "Inicio de sesión exitoso", user: others });
  });
};

export const logout = (req, res) => {
  // Lógica para cerrar sesión
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
  return res.status(200).json({ message: "Cierre de sesión exitoso" });
};