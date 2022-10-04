const user=require('../controller/user.js')
const jwt=require('jsonwebtoken');
const User = require('../model/user.js');

const authenticate=(req,res,next)=>{
    const token=req.header('Authorization');
    const user=jwt.verify(token,'shhhhh');
    console.log(user)
    User.findByPk(user.id).then(data=>{
        req.user=data;
        next();
    }).catch(err=>{
        res.status(401).json({success:false})
    })
}
module.exports={authenticate}