'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//Esquema
var etiquetasSchema = Schema({
    id_usuario:String,
    nombre:String
    
});




//Guardar en La coleccion de la Base De Datos
module.exports=mongoose.model('Etiqueta',etiquetasSchema);
