const express = require('express');
const router = express.Router();
const Cita = require('../Models/Cita');

// Ruta para crear un usuario (Padmin)
router.post('/registrarCita', (req, res) => {
    try{ 
        const nuevaCita = new Cita(req.body);
        nuevaCita.save()
            .then(Cita => {
                console.log('maquina guardado', Cita);
                res.status(201).json({ confirmacion: 'cita registrada con exito'});
            })
            .catch(error => {
                console.error('error guardando', error);
                res.status(500).json({ error: 'error registrando cita'})
            });
        

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

module.exports = router;
