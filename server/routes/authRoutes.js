import express from 'express';
import { connectionToDatabase } from '../lib/db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Usuario y contraseña son requeridos" 
      });
    }

    const db = await connectionToDatabase();
    const [users] = await db.query('SELECT * FROM Usuarios WHERE username = ?', [username]);
    
    if (users.length === 0 || users[0].password !== password) {
      return res.status(200).json({ 
        success: false, 
        message: "Credenciales inválidas" 
      });
    }

    const user = users[0];
    let userData = {};

    // Obtener datos según categoría
    switch(user.categoria) {
      case 'estudiantil':
        const [estudiante] = await db.query('SELECT * FROM Estudiantes WHERE usuario_id = ?', [user.id]);
        userData = estudiante[0];
        break;
      case 'administrativo':
        const [admin] = await db.query('SELECT * FROM Administrativos WHERE usuario_id = ?', [user.id]);
        userData = admin[0];
        break;
      case 'libre':
        const [libre] = await db.query('SELECT * FROM Libres WHERE usuario_id = ?', [user.id]);
        userData = libre[0];
        break;
    }

    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        email: user.email,
        categoria: user.categoria,
        categoriaData: userData
      }
    });

  } catch (err) {
    console.error('Error en login:', err);
    res.status(200).json({ 
      success: false, 
      message: "Error interno del servidor" 
    });
  }
});

router.get('/user-data', async (req, res) => {
  try {
    const { username } = req.query;
    console.log('Buscando usuario', username)
    
    if (!username) {
      return res.status(200).json({ 
        success: false, 
        message: "Usuario no especificado" 
      });
    }

    const db = await connectionToDatabase();
    const [users] = await db.query('SELECT * FROM Usuarios WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(200).json({ 
        success: false, 
        message: "Usuario no encontrado" 
      });
    }

    const user = users[0];
    let userData = {};

    // Obtener datos según categoría
    switch(user.categoria) {
      case 'estudiantil':
        const [estudiante] = await db.query('SELECT * FROM Estudiantes WHERE usuario_id = ?', [user.id]);
        userData = estudiante[0];
        break;
      case 'administrativo':
        const [admin] = await db.query('SELECT * FROM Administrativos WHERE usuario_id = ?', [user.id]);
        userData = admin[0];
        break;
      case 'libre':
        const [libre] = await db.query('SELECT * FROM Libres WHERE usuario_id = ?', [user.id]);
        userData = libre[0];
        break;
    }

    res.status(200).json({
      success: true,
      user: {
        username: user.username,
        categoria: user.categoria,
        categoriaData: userData
      }
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(200).json({ 
      success: false, 
      message: "Error del servidor" 
    });
  }
});

export default router;