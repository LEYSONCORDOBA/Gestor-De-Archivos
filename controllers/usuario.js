var Usuario=require('../models/usuario');
const usuario = require('../models/usuario');

var express=require('express')

var bodyparser = require('body-parser')
const path = require('path'); 
var app = express();

var controller2 = {

//guardar un proyecto en la base de datos
saveUsuario: function(req,res){
 var usuario = new Usuario();

 var params = req.body;
 usuario.nombre=params.nombre;
 usuario.username=params.username;
 usuario.password=params.password;

 
 

 usuario.save((err,usuarioStore)=>{
if(err)return res.status(500).send({message: 'error al guardar'});

if(!usuarioStore) return res.status(404).send({message: 'no se puede registrar el usuario'});


return res.status(200).send({usuario:usuarioStore});

 })
},

loginUsuario: function(req,res){

    const {username,password}=req.body;

    Usuario.findOne({username},(err,user)=>{
        if(err){
            res.status(500).send('Error Al Autenticar El Usuario');
        }else if(!user){
            res.status(500).send('El Usuario No Existe');

        }else{
           user.isCorrectPassword(password,(err,result)=>{
               if(err){
                   res.status(500).send('Error Al Autenticar');
               }else if(result){
                   res.status(200).send('Usuario Autenticado Correctamente')
               }else{
                res.status(500).send('Usuario Y/O Contraseña Incorrecta');
               }
           }) 
        }

    })

},



//buscar un proyecto en la base de datos
getUsuario:function(req,res){
    var usuarioId = req.params.id;

    if(usuarioId==null){
        return res.status(404).send({message: 'El Usuario No Existe'})
    }

    Usuario.findById(usuarioId,(err,user)=>{
        if(err) return res.status(500).send({message: 'error al devolver los usuario datos'})

        if(!user) return res.status(404).send({message: 'El usuario No Existe'})

        return res.status(200).send({
            user
        });
    });
},
//Listar Los Proyectos de la base de datos
getUsuarios: function(req,res){

    Usuario.find({}).exec((err,users)=>{
if(err)return res.status(500).send({message: 'error al devolver los datos'});

if(!users) return res.status(404).send({message: 'no hay usuarios para mostrar'})
    
return res.status(200).send({users});

})

},

//Actualizar Los Proyectos De La Base De Datos
updateUsuario: function(req,res){
    var usuarioId=req.params.id;
    var actualizar = req.body;

    Usuario.findByIdAndUpdate(usuarioId,actualizar,(err,usuarioUpdated)=>{
      if(err) return res.status(500).send({message: 'error al actualizar'});

      if(!usuarioUpdated) return res.status(404).send({message: 'no existe el usuario'})
       
      return res.status(200).status({
          usuario: usuarioUpdated
      })
    });
},

deleteUsuario: function(req,res){
    var usuarioId = req.params.id;

    Usuario.findByIdAndRemove(usuarioId,(err,usuarioRemoved)=>{
        if(err) return res.status(500).send({message: 'No se ha podido borrar el usuario'});

        if(!usuarioRemoved) return res.status(404).send({message: 'no se puede eliminar este usuario'});
        return res.status(200).send({
            usuario: usuarioRemoved
        })
    });
},



};




module.exports=controller2;