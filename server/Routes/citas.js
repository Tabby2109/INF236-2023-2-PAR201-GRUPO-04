const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');

const Cita = require('../Models/Cita');
const Cambio = require('../Models/Cambio');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        //console.log("USUARIOOOOO: " + req.user);
        //console.log(err);

        if (err) return res.sendStatus(403);
        console.log("this user: " + req.user);
        req.user = user;

        next();
    });
}

// Ruta para crear un usuario (Padmin)
router.post('/registrarCita', authenticateToken, (req, res) => {
    try{
        console.log(req);
        console.log("user: " + req.user.userId);
        const personalId = Number(req.user.userId);
        var {rutPaciente, nombrePaciente, maquinaId, fecha, motivoEx, tipoEx, contacto, infoExtra} = req.body;
        const [dia,hora] = fecha.split('T');
        console.log("hora: " + hora);
        const [hour, minutos,segundos] = hora.split(':');
        console.log("hour:" + hour);
        const fechaCorrection = new Date(fecha);
        
        fechaCorrection.setHours((parseInt(hour,10) - 3), parseInt(minutos,10)); //arreglar si se desea usar horario de invierno xd
        console.log("fecha corregida:")
        console.log(fechaCorrection);

        const endFecha = new Date(fecha);
        var [endHour, endMin] = hora.split(':');
        endHour = parseInt(hour,10) - 3;
        endMin = parseInt(minutos,10);

        if (tipoEx == "Resonancia" || tipoEx == "resonancia") {
            tipoEx = "Resonancia";
            endHour = endHour + 1; 
            if (endMin == 0){
                endMin = 30;
            }else{
                endMin = 0;
            }
        }   else if (tipoEx == "Scanner" || tipoEx == "scanner") {
            tipoEx = "Scanner";
            endHour = endHour + 1; 
        }   else if (tipoEx == "Radiografía" || tipoEx == "radiografía" || tipoEx == "ecografía" || tipoEx == "Ecografía") {
            if (tipoEx == "Radiografía" || tipoEx == "radiografía") {
                tipoEx = "Radiografía";
            } else {
                tipoEx = "Ecografía";
            }
            if (endMin == 0){
                endMin = 30;
            }else{
                endMin = 0;
                endHour = endHour + 1;
            }
        } 
        console.log("post arreglo");
        endFecha.setHours(endHour, endMin); //arreglar si se desea usar horario de invierno xd
        console.log("userid: ", req.user.userId);

        const nuevaCita = new Cita({personalId, rutPaciente, nombrePaciente, maquinaId, fecha:fechaCorrection, fin:endFecha ,hora, motivoEx, tipoEx, contacto, infoExtra});
        nuevaCita.save()
            .then(Cita => {
                const cambio = new Cambio({ usuario: req.user.userId, tipoCambio: "Nueva cita" });
                cambio.save()
                .then(()=>{
                    console.log('cita guardada con exito', Cita);
                    res.status(201).json({ confirmacion: 'cita registrada con exito'});
                })
                .catch(error =>{
                    console.error('error guardando cambio', error);
                    res.status(500).json({ error: 'error guardando cambio', user:req.user.userId})
                })
                
            })
            .catch(error => {
                console.error('error guardando', error);
                res.status(500).json({ error: 'error registrando cita', user:req.user.userId})
            });
        
    } catch (error) {
        res.status(500).json({ error: error.message});
        console.log('ID del usuario:', req.user.userId);
        console.log('cast:', user_id_cast);
    }
});

router.get('/getCitas', authenticateToken, async (req,res) => {
    try {
        const tipoExamen = req.query.tipoEx;
        const result = await Cita.find({tipoEx: tipoExamen});
        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error al obtener citas'});
    }

});

router.post('/getCitaById', authenticateToken, async (req,res) => {
    console.log(req);
    try {
        const result = await Cita.find({_id:req.body.id});
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
        var today = new Date();
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
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log(today);
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
