const mongoose = require('mongoose');

// Define el esquema de usuario
const pacienteSchema = new mongoose.Schema({
  _id: {
    type: String, // Tipo de dato para el RUT (puedes ajustarlo según tus necesidades)
  },
  nombre: {
    type: String,
    required: true,
  },
});

// Crea el modelo de datos del usuario
const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
