const express = require('express');
const router = express.Router();
const Maquina = require('../Models/Maquina');

// Ruta para crear un usuario (Padmin)
router.post('/crear-maquina', async (req, res) => {
  try {
    const {index, tipoMaquina} = req.body;

    if ((tipoMaquina !== "Radiografía") && (tipoMaquina !== "Resonancia") && (tipoMaquina !== "Ecografía") && (tipoMaquina !== "Scanner")){
      res.status(500).json({error: 'Error, el tipo de maquina no existe'});
    } else {
      const nuevoMaquina = new Maquina({
        index: index,
        tipoMaquina: tipoMaquina,
      });

      await nuevoMaquina.save();
      console.log('Maquina guardado:', nuevoMaquina);
      res.status(200).json({message: 'Máquina creada correctamente', maquina: nuevoMaquina});
      
    }
    
  } catch(error ){
    res.status(500).json({error: 'Error al crear máquina'});
  }
  
  
});

module.exports = router;
