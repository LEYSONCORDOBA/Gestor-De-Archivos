'use strict'


var express= require('express');

var projectController2=require('../controllers/usuario');

const { updateProject } = require('../controllers/usuario');

var router2 = express.Router();

var multiPart = require('connect-multiparty')

var multiPartMiddleware = multiPart({uploadDir: './uploads'});

router2.post('/autenticate',projectController2.loginUsuario);
router2.post('/register',projectController2.saveUsuario);
router2.get('/usuario/:id?',projectController2.getUsuario);
router2.get('/usuarios',projectController2.getUsuarios);
router2.put('/usuario/:id',projectController2.updateUsuario)
router2.delete('/usuario/:id',projectController2.deleteUsuario)



module.exports=router2