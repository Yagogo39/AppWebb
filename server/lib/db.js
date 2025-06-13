import mysql from 'mysql2/promise';

// Configuración explícita con valores por defecto
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root', // Valor por defecto explícito
  password: process.env.DB_PASSWORD || '', // Password vacío por defecto
  database: process.env.DB_NAME || 'Pruebas',
  waitForConnections: true,
  connectionLimit: 10
};

console.log('Configuración de DB:', dbConfig); // Para debug

const pool = mysql.createPool(dbConfig);

export const connectionToDatabase = async () => {
  return await pool.getConnection();
};