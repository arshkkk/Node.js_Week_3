exports.auth = (req,res,next)=>{

    console.log(req.session)

    if(!req.session.user){

        var authHeader = req.headers.authorization

        if(!authHeader){
            res.setHeader('WWW-Authenticate', 'Basic')
            return res.json(401,{result:null, message: "you need to authenticate", success:false})
        }
    
        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':') //array containing user and pass
        
        var username = auth[0]
        var password = auth[1]
        console.log(authHeader)
        console.log(username+" "+password)
        if(username!=='arsh.kk'||password!=='arshdeep1234') return res.json({result:null,message:"username or pass is not correct", success:false})

        req.session.user='arsh.kk'
        next()

    }
    else {
        if(req.session.user!=='arsh.kk'){
            return res.json(401,{result:null, message: "you need to authenticate", success:false})

        }
        
        next()
  
    }
  
}