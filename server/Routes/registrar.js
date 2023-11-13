const express = require('express');
const bodyParser = require('body-parser');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

const router = express.Router();
const Personal = require('../Models/Personal');

// Ruta para crear un usuario (Padmin)
router.post('/registrar', async (req, res) => {

    const { rut, password, nombre, isAdmin} = req.body;
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
            res.status(500).json({error: error.message});
        });
});

module.exports = router;
