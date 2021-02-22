'use strict'

var mongoose = require('mongoose');
var app=require('./app');
var part= 3700;


mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/Notificacion')
.then(()=>{
    console.log('conexion a la base de datos establecida con exito..')

    //creacion del servidor
app.listen(part,()=>{
   
    console.log('servidor corriendo correctamente en la url: localhost:3700')
})

})
.catch(err => console.log(err))

