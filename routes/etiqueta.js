'use strict'


var express= require('express');

var projectController3=require('../controllers/etiqueta')

var router3 = express.Router();

var multiPart = require('connect-multiparty')

var multiPartMiddleware = multiPart({uploadDir: './uploads'});


router3.post('/Save-etiqueta',projectController3.saveEtiqueta)
router3.get('/etiqueta/:id?',projectController3.getEtiqueta);
router3.get('/etiquetas',projectController3.getEtiquetas);
router3.put('/etiquetas/:id',projectController3.updateEtiqueta)
router3.delete('/etiquetas/:id',projectController3.deleteEtiqueta)


module.exports=router3