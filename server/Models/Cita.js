const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  personalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Padmin',
    required: true,
  },
  pacienteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true,
  },
  maquinaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Maquina',
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  hora: {
    type: String, 
    required: true,
  },
  motivoEx: {
    type: String,
  },
  tipoEx: {
    type: String,
  },

});

// Crea el modelo de datos de la cita
const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;
