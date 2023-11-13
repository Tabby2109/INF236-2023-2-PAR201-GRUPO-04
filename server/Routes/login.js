const express = require('express');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

const router = express.Router();
const Personal = require('../Models/Personal');

router.post('/login', async (req, res) => {
    try {
      const { rut, password } = req.body;
  
      // Verificar si el usuario existe
      const user = await Personal.findOne({ rut });
      if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
  
      // Verificar la contraseña
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
  
      // Generar un token JWT
      const token = jwt.sign({ userId: user._id }, 'FUNCIONAELLOGIN', { expiresIn: '1d' });
  
      res.status(200).json({ token, userId: user._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
