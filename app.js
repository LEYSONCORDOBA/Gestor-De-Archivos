'use strict'

var express=require('express')

var bodyparser = require('body-parser')
const path = require('path'); 
var app = express();

const multer= require('multer')
const mimeTypes=require('mime-types')


//cargar archivos de  rutas
var project_routes =require('./routes/project')
var project_routes1=require('./routes/archivo')
var project_routes2=require('./routes/usuario')
var project_routes3=require('./routes/etiqueta')
//middlewares
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())

app.use(express.static(path.join(__dirname,'public')))

//login
app.get('/', (req,res)=>{

})


//subir archivo

const storage =multer.diskStorage({
	destination:'uploads',
	filename:function(req,file,cb){
    cb("",Date.now() + "."+file.originalname );
	}
})

const filu=multer({
	storage: storage
})

app.get('/subir', (req,res)=>{
	res.sendFile(__dirname + "/public/archivo.html")

});


app.post('/subir',filu.single('filo'),(req,res)=>{
res.send("todo bien")

});


//cors
// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});
//rutas
app.use('/api',project_routes)
app.use('/api',project_routes1)
app.use('/api',project_routes2)
app.use('/api',project_routes3)
// exportar 

module.exports=app