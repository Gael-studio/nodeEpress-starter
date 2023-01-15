//this page concirns postman

const allowedCore = require('./allowedCores')

const corsOptions = {
    origin:(origin,callback)=>{
        if(allowedCore.indexOf(origin) !== -1 || !origin){
            callback(null,true)
        }else{
            callback(new Error('not Allowed by COES'))
        }
    },
    credentials:true,
    optionsSuccessStatus:200
}

module.exports = corsOptions