import { Schema, model } from 'mongoose';

const auditorioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    maxlength: 20
  },
  cedula: {
    type: Number,
    required: true,
    maxlength: 10
  },
  ubicacion: {
    type: String,
    required: true,
    maxlength: 60
  },
  capacidad:{
    type: Number,
    required: true,
    maxlength: 10
  },
  descripcion:{
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export default model('Auditorio',auditorioSchema)