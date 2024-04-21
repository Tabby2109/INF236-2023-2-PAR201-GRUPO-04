const mongoose = require('mongoose');

const cambioSchema = new mongoose.Schema({
    usuario: {
        type: Number,
        ref: 'Personal',
        required: true,
    },
    tipoCambio: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
}, {collection: 'Historial'});

const Cambio = mongoose.model('Cambio', cambioSchema);

module.exports = Cambio;
