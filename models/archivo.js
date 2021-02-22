'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;



//Esquema
var archivosSchema=Schema({
    id_etiqueta:String,
    id_usuario:String,
    nombre:String,
    publico:Boolean,
    url:String,
    password:String

});

//Guardar en La coleccion de la Base De Datos
module.exports=mongoose.model('Archivo',archivosSchema);