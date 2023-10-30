const express = require('express');
const router = express.Router();
const Maquina = require('../Models/Maquina');

// Ruta para crear un usuario (Padmin)
router.post('/crear-maquina', (req, res) => {
  const nuevoMaquina = new Maquina({
    _id: '1',
    tipoMaquina: 'Resonancia',
  });

  nuevoMaquina.save()
    .then(maquina => {
        console.log('maquina guardado', Maquina);
    })
    .catch(error => {
        console.error('error guardando', error);
    });
});

module.exports = router;
