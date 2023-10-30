const express = require('express');
const router = express.Router();
const Paciente = require('../Models/Paciente');

// Ruta para crear un usuario (Padmin)
router.post('/crear-paciente', (req, res) => {
  const nuevoPaciente = new Paciente({
    _id: '20712152-5',
    nombre: 'Test PACIENTE',
  });

  nuevoPaciente.save()
    .then(paciente => {
        console.log('Paciente guardado', Paciente);
    })
    .catch(error => {
        console.error('error guardando', error);
    });
});

module.exports = router;
