var Archivo=require('../models/archivo');


var controller1 = {

//guardar un proyecto en la base de datos
saveArchivo: function(req,res){
 var archivo = new Archivo();

 var params = req.body;
 archivo.id_etiqueta=params.id_etiqueta;
 archivo.id_usuario=params.id_usuario;
 archivo.nombre= params.nombre;
 archivo.publico=params.publico;
 archivo.url=params.url;
 archivo.password=params.password;

 
 

 archivo.save((err,archivoStore)=>{
if(err)return res.status(500).send({message: 'error al guardar'});

if(!archivoStore) return res.status(404).send({message: 'no se ha podido guardar el archivo'});


return res.status(200).send({archivo:archivoStore});

 })
},

//buscar un proyecto en la base de datos
getArchivo:function(req,res){
    var archivoId = req.params.id;

    if(archivoId==null){
        return res.status(404).send({message: 'El Archivo No Existe'})
    }

    Archivo.findById(archivoId,(err,archive)=>{
        if(err) return res.status(500).send({message: 'error al devolver los archivo datos'})

        if(!archive) return res.status(404).send({message: 'El Archivo No Existe'})

        return res.status(200).send({
            archive
        });
    });
},
//Listar Los Proyectos de la base de datos
getArchivos: function(req,res){

    Archivo.find({}).exec((err,archives)=>{
if(err)return res.status(500).send({message: 'error al devolver los datos'});

if(!archives) return res.status(404).send({message: 'no hay Archivos para mostrar'})
    
return res.status(200).send({archives});

})

},

//Actualizar Los Proyectos De La Base De Datos
updateArchivo: function(req,res){
    var archivoId=req.params.id;
    var actualizar = req.body;

    Archivo.findByIdAndUpdate(archivoId,actualizar,(err,archivoUpdated)=>{
      if(err) return res.status(500).send({message: 'error al actualizar'});

      if(!archivoUpdated) return res.status(404).send({message: 'no existe el archivo'})
       
      return res.status(200).status({
          archivo: archivoUpdated
      })
    });
},

deleteArchivo: function(req,res){
    var archivoId = req.params.id;

    Archivo.findByIdAndRemove(archivoId,(err,archivoRemoved)=>{
        if(err) return res.status(500).send({message: 'No se ha podido borrar el archivo'});

        if(!archivoRemoved) return res.status(404).send({message: 'no se puede eliminar ese archivo'});
        return res.status(200).send({
            archivo: archivoRemoved
        })
    });
},





};




module.exports=controller1;