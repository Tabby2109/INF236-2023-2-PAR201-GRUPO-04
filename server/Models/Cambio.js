const mongoose = require('mongoose');

const cambioSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
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
        set: function(v) { // Convierte a la zona horaria de chile
            const date = new Date(v);
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            return date;
        }
    },
}, {collection: 'Historial'});

const Cambio = mongoose.model('Cambio', cambioSchema);

module.exports = Cambio;
