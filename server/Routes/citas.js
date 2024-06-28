const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const Cita = require('../Models/Cita');
const Maquina = require('../Models/Maquina');
const Cambio = require('../Models/Cambio');

function obtenerDuracion(tipoExamen) {
    switch (tipoExamen) {
        case "Radiografía":
            return 15;
        case "Resonancia":
            return 60;
        case "Scanner":
            return 40;
        case "Ecografía":
            return 20;
        default:
            return 0; // Caso error
    }
}

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

// Ruta para crear una cita
router.post('/registrarCita', authenticateToken, async (req, res) => {
    try{
        const personalId = Number(req.user.userId);

        if (isNaN(personalId)) {
            throw new Error('personal id no es numero');
        }

        const {rutPaciente, nombrePaciente, maquinaId, fecha, motivoEx, tipoEx, contacto, infoExtra} = req.body;
        
        const rutRegex = /^\d{8}-[\dK]$/;
        if (!rutRegex.test(rutPaciente)) {
            throw new Error('rut no cumple')
        }

        if (!rutPaciente || !nombrePaciente || !maquinaId || !fecha || !motivoEx || !tipoEx || !contacto) {
            throw new Error('falta parametros')
        }

        let examTypeFormatted = tipoEx.charAt(0).toUpperCase() + tipoEx.slice(1).toLowerCase();
        if (examTypeFormatted === 'Radiografia') examTypeFormatted = 'Radiografía'
        else if (examTypeFormatted === 'Ecografia') examTypeFormatted = 'Ecografía'

        // Manejo de las horas
        const duration = obtenerDuracion(examTypeFormatted);

        let final = new Date(fecha)
        final.setMinutes(final.getMinutes() + duration);
        
        const hora = String(moment(fecha).format("HH:mm"));

        let queryFindMachine = { index: Number(maquinaId), tipoMaquina: examTypeFormatted.toString() }

        const maquina = await Maquina.findOne(queryFindMachine);
        if (!maquina) {
            throw new Error('La máquina no existe');
        }

        const newAppointment = new Cita({
            personalId, 
            rutPaciente, 
            nombrePaciente, 
            maquinaId: maquina._id, 
            fecha: fecha, 
            fin: final, 
            hora, 
            motivoEx, 
            tipoEx: examTypeFormatted, 
            contacto, 
            infoExtra
        });

        let savedAppointment
        try {
            savedAppointment = await newAppointment.save()
        } catch (error) {
            console.error('error guardando', error)
            res.status(500).json({ error: 'error registrando cita', user: req.user.userId})
        }

        const change = new Cambio({ usuario: req.user.userId, tipoCambio: "Nueva cita" })

        try {
            await change.save()
        } catch (error){
            if (savedAppointment) {
                await Cita.findByIdAndDelete(savedAppointment._id)
            }
            res.status(500).json({ error: 'error guardando cambio', user: req.user.userId})
        }

        res.status(201).json({ confirmacion: 'cita registrada con exito', id: newAppointment._id})
    } catch (error) {
        res.status(500).json({ error: 'error registrando cita', detail:error.message});
    }
});

// Patch modifica una sola parte de la cita o toda no es necesario enviar todos los campos, 
// PUT para modificarlo completo.
router.patch('/modificarCita/:citaId', authenticateToken, async (req, res) => {
    try {
        const citaId = req.params.citaId;
        const updates = req.body;
        // Prohibir algunas modificaciones
        if (updates.hora || updates.fin){
            throw new Error('Esta modificación está prohibida');
        }

        const cita = await Cita.findById(citaId); // Cita original
        if (!cita){
            throw new Error('La cita no existe.\n');
        }

        if (updates.fecha) {
            const duration = obtenerDuracion(updates.tipoEx);
            const final = new Date(updates.fecha);
            final.setMinutes(final.getMinutes() + duration);

            updates.fin = final;
            updates.hora = String(moment(updates.fecha).format("HH:mm"));
        }

        if (updates.maquinaId) {
            let machineType = updates.tipoEx || cita.tipoEx
            let queryFindMachine = { index: updates.maquinaId, tipoMaquina: machineType.toString() }

            const maquina = await Maquina.findOne(queryFindMachine);

            if (!maquina) {
                throw new Error('La máquina no existe.');
            }
            updates.maquinaId = maquina._id;
        }

        const citaModificada = await Cita.findByIdAndUpdate(citaId, updates, { new: true });

        if (!citaModificada) {
            throw new Error('La cita no existe');
        }

        const cambio = new Cambio({ usuario: req.user.userId, tipoCambio: "Modificación de cita" });
        await cambio.save();

        console.log('cita modificada con éxito', cita);
        res.status(200).json({ confirmacion: 'cita modificada con éxito' });
    } catch (error) {
        console.error('Error al modificar la cita:', error);
        res.status(500).json({ error: 'error al modificar la cita' });
    }
});

router.delete('/eliminarCita/:citaId', authenticateToken, async (req, res) => {
    try {
        const citaId = req.params.citaId;
        const citaEliminada = await Cita.findByIdAndDelete(citaId);

        if (!citaEliminada) {
            throw new Error('La cita no existe');
        }

        const cambio = new Cambio({ usuario: req.user.userId, tipoCambio: "Eliminación de cita" });
        await cambio.save();

        console.log('Cita eliminada con éxito', citaEliminada);
        res.status(200).json({ confirmacion: 'Cita eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la cita:', error);
        res.status(500).json({ error: 'Error al eliminar la cita' });
    }
});


router.get('/getCitas', authenticateToken, async (req,res) => {
    try {
        let result;
        const tipoMaquina = req.query.tipoMaquina;
        const index = Number(req.query.index);

        // Si el index = -1 incluye todas las maquinas para ese tipo de examen
        if (index === -1){
            let queryAppointment = {tipoEx: tipoMaquina.toString()}

            result = await Cita.find(queryAppointment).populate('maquinaId');
        } else { // En caso contrario, escoge un id especifico de maquina
            let queryFindMachine = { index: index, tipoMaquina: tipoMaquina.toString() }

            const maquina = await Maquina.findOne(queryFindMachine);
            if (!maquina) {
                throw new Error('La máquina no existe');
            }

            let queryAppointment = {tipoEx: tipoMaquina.toString(), maquinaId: maquina._id}

            result = await Cita.find(queryAppointment).populate('maquinaId');
        }

        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error al obtener citas'});
    }

});

router.post('/getCitaById', authenticateToken, async (req,res) => {
    try {
        let queryFindAppointment = {_id: Number(req.body.id)}

        const result = await Cita.find(queryFindAppointment);
        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error al obtener cita'});
    }

});

// Búsqueda avanzada del paciente, por rut y nombre
// No olvidar agregar el authenticate token, pero considerarlo en los headers de busquedaPaciente.js
router.get('/getCitaByRUT/:rut', authenticateToken, async (req, res) => {
    try {
        const rut = req.params.rut;
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(today);
        // Desde hoy en adelante busca las citas pendientes por rut
        const result = await Cita.find({ 
            rutPaciente: rut,
            fecha: {$gte: today}
        }).sort({fecha: 1});
        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error al obtener las citas por rut'});
    }
});

router.get('/getCitaByName/:nombre', authenticateToken, async (req, res) => {
    try {
        const name = req.params.nombre;
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Desde hoy en adelante busca las citas pendientes por nombre
        const result = await Cita.find({ 
            nombrePaciente: name, 
            fecha: {$gte: today} 
        }).sort({fecha: 1});
        res.status(200).json(result)
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error al obtener las citas por rut'});
    }
});

module.exports = router;
