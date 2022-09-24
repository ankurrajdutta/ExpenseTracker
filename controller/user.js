const user=require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.addUser=(req,res,next)=>{
   const userName=req.body.userName;
   const userMail=req.body.userMail;
   const userPassword=req.body.userPassword;
   bcrypt.hash(userPassword, saltRounds).then(function(hash) {
      return user.create({name:userName,
         email:userMail,
         password:hash 
         })
   }).then(result=>{
      return res.status(200).json({success:true,message:'User Created'})
   }).catch(err=>{
      return res.status(400).json({success:false,message:'something went wrong'})   
   });

  
}

exports.loginUser=(req,res,next)=>{
   const userMail=req.body.userMail;
   const userPassword=req.body.userPassword;
   user.findOne({
      where:{
         email:userMail
      }
   }).then(result=>{
         bcrypt.compare(userPassword, result.password).then(function(Cresult) {
              if(Cresult==true){
               res.status(200).json({success:true,message:'User Log in Successful'})
              }else
              {
                 res.status(401).json({success:false,message:'User Not Authorized'})
              }
         })      
   }).catch(err=>{
      res.status(404).json({success:false,message:'User Not Found'})
   })
}
