const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Modelo de cada cambio.
const Cambio = require('../Models/Cambio');
const Personal = require('../Models/Personal');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.get('/getChangesHistory', authenticateToken,  async (req,res) => {
    try {
        const result = await Cambio.find().populate('usuario');
        res.status(200).json(result)
    } catch (error){
        res.status(500).json({error: 'Error al obtener el historial de cambios'});
    }
});

module.exports = router;