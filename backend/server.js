const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

//conexion con la BD de mongo
mongoose
    //.connect('mongodb://127.0.0.1:27017/empleadosds01')
    .connect('mongodb+srv://ricardoutsjr:1234@ds01.hwwnf7s.mongodb.net/empleadosds01?retryWrites=true&w=majority')
    .then((x) => {
        console.log(`Conectado exitosamente a la BD: "${x.connections[0].name}"`)
    })
    .catch((err) => {
        console.log('Error al conectarse con Mongo', err.reason)
    })

// Configuracion del servidor web
const empleadoRuta = require('./routes/empleado.route')
const app = express()
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false
    }),
)
app.use(cors())
app.use(express.static(path.join(__dirname,'dist/empleados-mean')))
app.use('/',express.static(path.join(__dirname,'dist/empleados-mean')))
app.use('/api',empleadoRuta)

//Habilitar puerto
const port = process.env.PORT || 4000
const server = app.listen(port,()=>{
    console.log('Conectado exitosamente al puerto '+port)
})

//manejador de error 404
app.use((req,res,next) =>{
    next(createError(404))
})

//manejador de errores
app.use(function(err,req,res,next){
    console.error(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})
