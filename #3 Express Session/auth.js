const User = require('./model/user')

exports.auth = (req,res,next)=>{

    console.log(req.session)

    if(req.session.userId===null)
    return res.json(401,{result:null,message:'You are not logged In',success:false})

    if(req.session.userId!==null) {
        console.log('Inside')
        User.findById(req.session.userId,(err,user)=>{
            
            if(err)
            return res.json(501,{result:null,success:false,message:'Internal Server Error'})

            if(user===null)
            return res.json(401,{result:null,success:false,message:'Invalid Cookies or Session'})

            next()
        })
     
    }


  
}