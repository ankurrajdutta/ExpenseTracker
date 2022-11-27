const jwt=require('jsonwebtoken');
const User = require('../model/user.js');

const authenticate=(req,res,next)=>{
    const token=req.header('Authorization');
    console.log('token',token)
    const user=jwt.verify(token,'shhhhh');
    console.log(user._id)
    User.findOne({_id:user._id}).then(data=>{
        req.user=data;
        console.log('req.user',data);
        console.log('12')
        next();
    }).catch(err=>{
        res.status(401).json({success:false})
    })
}
module.exports={authenticate}