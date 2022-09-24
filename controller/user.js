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
