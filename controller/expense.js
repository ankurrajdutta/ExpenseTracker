const Expense=require('../model/expense');
const User=require('../model/user')

exports.addExpense=(req,res,next)=>{
   const inputDescription=req.body.description;
   const inputCategory=req.body.category;
   const inputPrice=req.body.money;
   console.log(inputCategory,inputDescription,inputPrice)
   console.log(req.user.dataValues.id);
   console.log('in add Expense controller')
   console.log(req.user)
   console.log('line12')
   User.findByPk(req.user.dataValues.id).then(user=>{
       console.log(user)
        return user.createExpense({
            money:inputPrice,
            description:inputDescription,
            category:inputCategory
        })
   })
   .then(result=>{
       const obj=result.dataValues;
       return res.status(200).json({success:true,message:'Expense added',obj})
   }).catch(err=>{
       return res.status(400).json({success:false,message:'Something went wrong'})
   })
}

exports.getExpense=(req,res,next)=>{
    console.log(req.user)
    console.log('in getExpense')
    console.log(req.user.dataValues.id)
    Expense.findAll({
        where: {UserId:req.user.dataValues.id}
    }).then(data=>{
        return res.status(200).json(data)
    }).catch(err=>{
        return res.status(400).json({success:false,message:'something went wrong'})
    })
}

exports.deleteExpense=(req,res,next)=>{
    let id=req.params.expenseId;
    Expense.destroy({where:{
        id:id
    }}).then(result=>{
        res.status(200).json({success:true,message:'deleted Successfully'})
    }).catch(err=>{
        res.status(400).json({success:false,message:'something went wrong'})
    })

}