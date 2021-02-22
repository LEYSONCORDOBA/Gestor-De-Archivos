'use strict'


var express= require('express');

var projectController1=require('../controllers/archivo')

var router1 = express.Router();

var multiPart = require('connect-multiparty')

var multiPartMiddleware = multiPart({uploadDir: './uploads'});


router1.post('/Save-archivo',projectController1.saveArchivo)
router1.get('/archivo/:id?',projectController1.getArchivo);
router1.get('/archivos',projectController1.getArchivos);
router1.put('/archivo/:id',projectController1.updateArchivo)
router1.delete('/project/:id',projectController1.deleteArchivo)


module.exports=router1