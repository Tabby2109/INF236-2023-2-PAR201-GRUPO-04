const express = require('express');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config({ path: '../server.env' });

const router = express.Router();
const Personal = require('../Models/Personal');

router.post('/login', async (req, res) => {
    try {
      const { rut, password } = req.body;
      //console.log(rut,password)
      // Verificar si el usuario existe
      let queryFindUser = { rut: rut.toString() }
      const user = await Personal.findOne(queryFindUser);
      if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
  
      // Verificar la contraseña
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
      }
      
      // Generar un token JWT
      const token = jwt.sign({ userId: user._id, userIsAdmin: user.isAdmin }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
  
      res.status(200).json({ token, userId: user._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
