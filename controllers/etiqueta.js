const etiqueta = require('../models/etiqueta');
var Etiqueta=require('../models/etiqueta');


var controller3 = {

//guardar un proyecto en la base de datos
saveEtiqueta: function(req,res){
 var etiqueta = new Etiqueta();

 var params = req.body;
 
 etiqueta.id_usuario=params.id_usuario;
 etiqueta.nombre= params.nombre;

 
 

 etiqueta.save((err,etiquetaStore)=>{
if(err)return res.status(500).send({message: 'error al guardar'});

if(!etiquetaStore) return res.status(404).send({message: 'no se ha podido guardar la etiqueta'});


return res.status(200).send({etiqueta:etiquetaStore});

 })
},

//buscar un proyecto en la base de datos
getEtiqueta:function(req,res){
    var etiquetaId = req.params.id;

    if(etiquetaId==null){
        return res.status(404).send({message: 'La Etiqueta No Existe'})
    }

    Etiqueta.findById(etiquetaId,(err,label)=>{
        if(err) return res.status(500).send({message: 'error al devolver las etiquetas'})

        if(!label) return res.status(404).send({message: 'la Etiqueta No Existe'})

        return res.status(200).send({
            label
        });
    });
},
//Listar Los Proyectos de la base de datos
getEtiquetas: function(req,res){

    Etiqueta.find({}).exec((err,label)=>{
if(err)return res.status(500).send({message: 'error al devolver los datos'});

if(!label) return res.status(404).send({message: 'no hay etiquetas para mostrar'})
    
return res.status(200).send({label});

})

},

//Actualizar Los Proyectos De La Base De Datos
updateEtiqueta: function(req,res){
    var etiquetaId=req.params.id;
    var actualizar = req.body;

    Etiqueta.findByIdAndUpdate(etiquetaId,actualizar,(err,etiquetaUpdated)=>{
      if(err) return res.status(500).send({message: 'error al actualizar'});

      if(!etiquetaUpdated) return res.status(404).send({message: 'no existe la etiqueta'})
       
      return res.status(200).status({
          etiqueta: etiquetaUpdated
      })
    });
},

deleteEtiqueta: function(req,res){
    var etiquetaId = req.params.id;

    Etiqueta.findByIdAndRemove(etiquetaId,(err,etiquetaRemoved)=>{
        if(err) return res.status(500).send({message: 'No se ha podido borrar la etiqueta'});

        if(!etiquetaRemoved) return res.status(404).send({message: 'no se puede eliminar esta etiqueta'});
        return res.status(200).send({
            etiqueta: etiquetaRemoved
        })
    });
}






};




module.exports=controller3;