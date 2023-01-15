require('dotenv').config() //this allows us to use dotenv pakage throughout our file we dont need to import it all the time 
const express = require('express')
const app = express()
const path = require('path')
const {logger} = require('./midleware/logger')
const errorHandler = require('./midleware/errorHandle')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/coreOptions')

console.log(process.env.NODE_ENV);
app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root') )
app.all('*', (req,res)=>{
    res.status(404)
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname, './views/404.html'))
    }else if (req.accepts('json')){
        res.json({massage:'404 not found'})
    }else{
        res.type('text').send('404 not found')
    }
})

app.use(errorHandler)

app.listen(5000, ()=>{
    console.log('server is running on port 5000');
})