const mongoose = require('mongoose');

// Define el esquema de usuario
const maquinaSchema = new mongoose.Schema({
  _id: {
    type: Number, // Tipo de dato para el RUT (puedes ajustarlo según tus necesidades)
  },
  tipoMaquina: {
    type: String,
    required: true,
  },
});

// Crea el modelo de datos del usuario
const Maquina = mongoose.model('Maquina', maquinaSchema);

module.exports = Maquina;
