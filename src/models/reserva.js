import { Schema, model } from 'mongoose';

const reservaSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        maxlength: 20
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 50
    },
    id_auditorio: [{
        type: Schema.Types.ObjectId,  // Usar Schema en lugar de mongoose.Schema
        ref: "Auditorio"
    }],
    id_conferencia: [{
        type: Schema.Types.ObjectId,  // Usar Schema en lugar de mongoose.Schema
        ref: "Conferencia"
    }]
  }, {
    timestamps: true
  });
  
  export default model('Reserva',reservaSchema)