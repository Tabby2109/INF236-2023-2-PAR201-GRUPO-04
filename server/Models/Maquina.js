const mongoose = require('mongoose');

const maquinaSchema = new mongoose.Schema({
  index: {
    type: Number, // Index es el identificador por tipo de maquina, no confundir con _id de MongoDB
    required: true,
  },
  tipoMaquina: {
    type: String,
    required: true,
  },
});

const Maquina = mongoose.model('Maquina', maquinaSchema);

module.exports = Maquina;
