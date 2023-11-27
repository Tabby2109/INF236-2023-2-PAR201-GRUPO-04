const mongoose = require('mongoose');

var Counter2Schema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter2 = mongoose.model('counter2', Counter2Schema);


const citaSchema = new mongoose.Schema({
  _id: Number,
  personalId: {
    type: Number,
    ref: 'Personal',
    required: true,
  },
  rutPaciente: {
    type: String,
    required: true,
  },
  nombrePaciente: {
    type: String,
    required: true,
  },
  maquinaId: {
    type: Number,
    ref: 'Maquina',
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  fin: {
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
  infoExtra: {
    type: String,
  },
});

citaSchema.pre('save', async function (next) {
  try {
      const doc = this;
      const counter2Doc = await counter2.findByIdAndUpdate(
          { _id: 'entityId' },
          { $inc: { seq: 1 } },
          { new: true, upsert: true } // Necesario para que la promesa devuelva el documento actualizado
      );

      doc._id = counter2Doc.seq;
      next();
  } catch (error) {
      next(error);
  }
});

// Crea el modelo de datos de la cita
const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;
