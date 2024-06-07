const express = require('express');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

const router = express.Router();
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

// Ruta para crear un usuario (Padmin)
router.post('/registrar', async (req, res) => {
    try {
        const { rut, password, nombre, isAdmin} = req.body;

        const rutRegex = /^\d{8}-[\dK]$/;
        if (!rutRegex.test(rut)) {
            throw new Error('rut no cumple')
        }

        if (nombre.length >= 20){
            throw new Error('nombre es muy largo')
        }

        if (password.length >= 16){
            throw new Error('contrasena muy larga')
        }
    
        const existingUser = await Personal.findOne({ rut });
        if (existingUser) {
            return res.status(400).json({ message: 'usuario ya existe'});
        }
    
        const hashPass = await bcryptjs.hash(password, 10);
    
        const newPersonal = new Personal({ rut, password: hashPass, nombre, isAdmin})
    
        await newPersonal.save()
            .then(personal => {
                console.log('Personal guardado', Personal);
                res.status(201).json({ message: 'registro exitoso'});
            })
            .catch(error => {
                console.error('error guardando', error);
                res.status(500).json({message: 'error guardando'});
            });
    } catch(error){
        res.status(500).json({message: 'error guardando'});
    }
});

router.post('/eliminarUser', authenticateToken, async (req,res)=>{
    const {rut} = req.body;
    const existingUser = await Personal.findOne({ rut });
    try{
        if (existingUser) {
            const eliminacionUser = await Personal.findByIdAndDelete(existingUser._id)
            if(!eliminacionUser){
                throw new Error('usuario no borrado');
            }
            console.log('usuario borrado');
            res.status(200).json({confirmacion:'usuario borrado exitosamente'});
        } else {
            throw new Error('usuario no existe');
        }
    } catch(error) {
        console.error('error eliminando usuario', error);
        res.status(500).json({error:'Error al eliminar usuario'})
    }
});
module.exports = router;
