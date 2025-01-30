import pkg from 'pg'; 
const { Client } = pkg;

export const db = new Client({
  host: "localhost", // Cambia esto al host de tu base de datos
  port: 5432,        // El puerto por defecto de PostgreSQL
  user: "postgres",   // Cambia esto al usuario de tu base de datos
  password: "gabriel1899", // Cambia esto a la contraseña del usuario
  database: "social", // Cambia esto al nombre de tu base de datos
});

