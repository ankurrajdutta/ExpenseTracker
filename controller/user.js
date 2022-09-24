const user=require('../model/user');

exports.addUser=(req,res,next)=>{
   const userName=req.body.userName;
   const userMail=req.body.userMail;
   const userPassword=req.body.userPassword;
   user.create({name:userName,
   email:userMail,
   password:userPassword 
   }).then(result=>{
      res.status(200).json({success:true,message:'its working'})
   }).catch(err=>{
      return res.status(400).json({success:false,message:'something went wrong'})   
   })
}

exports.loginUser=(req,res,next)=>{
   const userMail=req.body.userMail;
   const userPassword=req.body.userPassword;
   user.findOne({
      where:{
         email:userMail
      }
   }).then(result=>{
         if(result.password==userPassword){
            res.status(200).json({success:true,message:'User Log in Successful'})
         }else
         {
            res.status(401).json({success:false,message:'User Not Authorized'})
         }
   }).catch(err=>{
      res.status(404).json({success:false,message:'User Not Found'})
   })
}
