exports.auth = (req,res,next)=>{

    var authHeader = req.headers.authorization
    if(!authHeader){
        res.setHeader('WWW-Authenticate', 'Basic')
        res.statusCode = 401
        return res.json({result:null, message: "you need to authenticate", success:false})
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':') //array containing user and pass
    
    var username = auth[0]
    var password = auth[1]
    console.log(authHeader)
    console.log(username+" "+password)
    if(username!=='username'||password!=='password') return res.json({result:null,message:"username or pass is not correct", success:false})

    
    next()
    
}