const mongoose = require('mongoose');

var CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

// Define el esquema de usuario
const personalSchema = new mongoose.Schema({
  _id: Number,
  rut: {
    type: String,
    required: true,
    unique: true,
    // Tipo de dato para el RUT (puedes ajustarlo según tus necesidades)
  },
  password:{
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  }
});

personalSchema.pre('save', async function (next) {
    try {
        const doc = this;
        const counterDoc = await counter.findByIdAndUpdate(
            { _id: 'entityId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true } // Necesario para que la promesa devuelva el documento actualizado
        );

        doc._id = counterDoc.seq;
        next();
    } catch (error) {
        next(error);
    }
});

const Personal = mongoose.model('Personal', personalSchema);

module.exports = Personal;
