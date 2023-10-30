const mongoose = require('mongoose');

// Define el esquema de usuario
const padminSchema = new mongoose.Schema({
  _id: {
    type: String, // Tipo de dato para el RUT (puedes ajustarlo según tus necesidades)
  },
  nombre: {
    type: String,
    required: true,
  },
  codigoPersonal: {
    type: String,
    required: true,
  },
});

// Crea el modelo de datos del usuario
const Padmin = mongoose.model('Padmin', padminSchema);

module.exports = Padmin;
