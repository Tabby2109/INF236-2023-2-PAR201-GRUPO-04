const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Cita = require('../Models/Cita');

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);

        if (err) return res.sendStatus(403);

        req.user = user;

        next();
    });
}

// Ruta para crear un usuario (Padmin)
router.post('/registrarCita', authenticateToken, (req, res) => {
    try{
        
        const personalId = Number(req.user.userId);
        console.log(typeof personalId);
        const {rutPaciente, nombrePaciente, maquinaId, fecha, hora, motivoEx, tipoEx, infoExtra} = req.body;

        
        const fechaCorrection = new Date(fecha);
        console.log(fechaCorrection);
        const [hour, minutos] = hora.split(':');
        console.log(hour);
        fechaCorrection.setHours((parseInt(hour,10) - 3), parseInt(minutos,10)); //arreglar si se desea usar horario de invierno xd
        console.log(fechaCorrection);
        const nuevaCita = new Cita({personalId, rutPaciente, nombrePaciente, maquinaId, fecha, hora, motivoEx, tipoEx, infoExtra});
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

router.get('/getCitas', authenticateToken, async (req,res) => {
    try {
        const result = await Cita.find();
        res.status(200).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'error al obtener citas'});
    }

});
module.exports = router;
