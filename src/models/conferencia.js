import { Schema, model } from 'mongoose';

const conferenciaSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    maxlength: 20
  },
  apellido: {
    type: String,
    required: true,
    maxlength: 20
  },
  cedula: {
    type: Number,
    required: true,
    maxlength: 10
  },
  genero: {
    type: String,
    required: true,
    maxlength: 20 
  },
  ciudad:{
    type: String,
    required: true,
    maxlength: 30
  },
  direccion:{
    type: String,
    required: true,
    maxlength: 30
  },
  fecha_nacimiento:{
    type: Date,
    required: true
  },
  telefono:{
    type: Number,
    required: true,
    maxlength: 10
  },
  email: {
    type: String,
    required: true,
    maxlength: 50 
  },
  empresa:{
    type: String,
    required: true,
    maxlength: 50
  }
}, {
  timestamps: true
});

export default model('Conferencia',conferenciaSchema)