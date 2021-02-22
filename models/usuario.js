'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { callbackPromise } = require('nodemailer/lib/shared');

const slatRounds=10;

//Esquema
var usuariosSchema = Schema({
    nombre: {type: String, require:true,unifique:true, } ,
    username: {type: String, require:true,unifique:true,  },
    password:{type: String, require:true,unifique:true,} 
});

usuariosSchema.pre('save',function(next){
    if(this.isnew || this.isModified('password')){
        const document = this;
        
        bcrypt.hash(document.password,slatRounds,(err,hashedPassword)=>{
         
            if(err){
                next(err)
            }else{
                document.password = hashedPassword;
                next()
            }

        });
    }else{
        next()
    }
});

usuariosSchema.methods.isCorrectPassword = function(password,callback){
    bcrypt.compare(password,this.password, function(err,same){
        if(err){
            callback(err);
        }else{
            callback(err,same);
        }
    });
}



//Guardar en La coleccion de la Base De Datos
module.exports=mongoose.model('Usuario',usuariosSchema);

