const express = require('express');
const router = express.Router();
const Padmin = require('../Models/Padmin');

// Ruta para crear un usuario (Padmin)
router.post('/crear-personal', (req, res) => {
  const nuevoPadmin = new Padmin({
    _id: '21128959-7',
    nombre: 'Test PADMIN',
    codigoPersonal: '112',
  });

  nuevoPadmin.save()
    .then(padmin => {
        console.log('Padmin guardado', Padmin);
    })
    .catch(error => {
        console.error('error guardando', error);
    });
});

module.exports = router;
