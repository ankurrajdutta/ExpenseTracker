let user=require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.getPassword=(req,res,next)=>{
   
    let fiveDigit=Math.random()*100000;
    fiveDigit=Math.ceil(fiveDigit)
    let fiveString=fiveDigit.toString();
    let userEmail=req.body.emailObj;
    user.findOne({
        where:{
            email:userEmail
        }
    }).then(userData=>{
        bcrypt.hash(fiveString, saltRounds).then(function(hash){
        return userData.update({
                password:hash
            })
        }).then(response=>{
             return res.status(200).json({success:true,message:"User new password updated",fiveString})
        }).catch(err=>{
            console.log(err)
            return res.status(400).json({success:false,message:"Something went wrong"})
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(400).json({success:false,message:"Something went wrong"})
    })

   
}