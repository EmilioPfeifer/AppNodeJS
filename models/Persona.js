const mongoose = require('mongoose');
//import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//creacion de esquema para el documento nosql
const personaSchema = new Schema({

    nombre: {type: String, required: [true, 'Nombre Obligatorio']},//Para campo Obligatorio
    descripcion: String,
    date: {type: Date, default: Date.now}, //fecha actual por defecto
    activo: {type: Boolean, default: true}

});
//conversion a modelo
const Persona = mongoose.model('Persona', personaSchema);

export default Persona;