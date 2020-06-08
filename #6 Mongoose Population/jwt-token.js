var jwt = require('jsonwebtoken')
var config = require('./config')

const getJwtTokenFromRequest= (req)=>{
  
    const token = req.headers.authorization.split(' ')[1]
    return token
    
}

exports.getToken = ({payload})=>{
    return jwt.sign({payload:payload},config.secretKey,{expiresIn:config.expiresIn_JWT})
}

exports.verifyUser = (req,res,next)=>{

    if(req.headers.authorization)
    var token = getJwtTokenFromRequest(req)
    else if(req.signedCookies.token)
    var token = req.signedCookies.token
    else
    return res.json({success:false, result:null, message:'You  are not logged In'})


    jwt.verify(token,config.secretKey,(err,payload)=>{

        
        if(err) {
            res.clearCookie('token')
            return res.json({success:false, result: err, message: 'Token Expired or Invalid, Please login again'})

         }
        
         //payload === userId
         console.log(payload)
        req.userId= payload.payload
        next()

    })
}

