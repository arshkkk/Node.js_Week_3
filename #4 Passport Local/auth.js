const User = require('./model/user')

exports.auth = (req,res,next)=>{

    console.log(req.body)

    if(req.user==null)
    {
        req.session.destroy()
        res.clearCookie('session-id')
        return res.json(401,{result:null,message:'You are not logged In',success:false})

    }

    if(req.user!=null) {
       next()
    }
     
}


  
