const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Cita = require('../Models/Cita');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        //console.log(err);

        if (err) return res.sendStatus(403);

        req.user = user;

        next();
    });
}

// Ruta para crear un usuario (Padmin)
router.post('/registrarCita', authenticateToken, (req, res) => {
    try{
        
        const personalId = Number(req.user.userId);
        var {rutPaciente, nombrePaciente, maquinaId, fecha, motivoEx, tipoEx, infoExtra} = req.body;
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
        }   else if (tipoEx == "Radiografia" || tipoEx == "radiografia" || tipoEx == "ecografia" || tipoEx == "Ecografia") {
            if (tipoEx == "Radiografia" || tipoEx == "radiografia") {
                tipoEx = "Radiografia";
            } else {
                tipoEx = "Ecografia";
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

        const nuevaCita = new Cita({personalId, rutPaciente, nombrePaciente, maquinaId, fecha:fechaCorrection, fin:endFecha ,hora, motivoEx, tipoEx, infoExtra});
        nuevaCita.save()
            .then(Cita => {
                console.log('cita guardada', Cita);
                res.status(201).json({ confirmacion: 'cita registrada con exito'});
            })
            .catch(error => {
                console.error('error guardando', error);
                res.status(500).json({ error: 'error registrando cita', user:req.user.userId})
            });
        

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

router.get('/getCitas', async (req,res) => {
    try {
        const result = await Cita.find();
        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error al obtener citas'});
    }

});

router.post('/getCitaById', async (req,res) => {
    console.log(req);
    try {
        const result = await Cita.find({_id:req.body.id});
        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error al obtener cita'});
    }

});
module.exports = router;
