const User=require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

exports.addUser=(req,res,next)=>{
   const userName=req.body.userName;
   const userMail=req.body.userMail;
   const userPassword=req.body.userPassword;
  
   bcrypt.hash(userPassword, saltRounds).then(function(hash) {
     
      const user= new User({
         name:userName,
         email:userMail,
         password:hash
      })
      console.log('user',user)
      return user.save();
   }).then(result=>{
      return res.status(200).json({success:true,message:'User Created'})
   }).catch(err=>{
      console.log(err)
      return res.status(400).json({success:false,message:'something went wrong'})   
   });

  
}

function generateWebToken(id){
   return jwt.sign({ _id: id }, 'shhhhh');
}

exports.loginUser=(req,res,next)=>{
   const userMail=req.body.userMail;
   const userPassword=req.body.userPassword;
   User.findOne({ 
         email:userMail
   }).then(result=>{
         bcrypt.compare(userPassword, result.password).then(function(Cresult) {
              if(Cresult==true){
               console.log(result);
               res.status(200).json({success:true,message:'User Log in Successful',token:generateWebToken(result._id)})
              }else
              {
                 res.status(401).json({success:false,message:'User Not Authorized'})
              }
         })      
   }).catch(err=>{
      res.status(404).json({success:false,message:'User Not Found'})
   })
}
