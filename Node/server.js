const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const path = require('path')
require('dotenv').config()
const mongoose = require('mongoose')
const helmet= require('helmet')
const csrf = require('csurf')
const {checkCRSUF,csrfMiddlware, middlewareGlobal} = require('./src/middleware/middleware')


const session = require('express-session')
const mongoStore= require('connect-mongo')(session)
const flash= require('connect-flash')


const sessionOptions = session({
    secret: process.env.secret,
    store: new mongoStore({mongooseConnection: mongoose.connection}),
    resave: false,    
    saveUninitialized:false,
    coockie:{
        originalMaxAge: 1000 * 60 * 60,
        httpOnly:true
    }
})

mongoose.connect(process.env.mongoConnect,{ useNewUrlParser: true , useUnifiedTopology: true})
.then(()=>{
    console.log('conectado')
    app.emit('pronto')
}).catch(e=> console.log('error'+ e))


app.use(express.urlencoded({extended:true}))
app.use(express.static(path.resolve(__dirname, './public')))

app.use(sessionOptions)
app.use(flash())
app.use(csrf())
app.use(helmet()) 
app.use(csrfMiddlware)
app.use(checkCRSUF)
app.use(middlewareGlobal)
app.use(routes)




app.set('views' , path.resolve(__dirname, 'src','views'))
app.set('view engine' , 'ejs')

app.on('pronto',()=>{
    app.listen(port,()=> console.log('Servidor rodando'))
})
