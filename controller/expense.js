const Expense=require('../model/expense')

exports.addExpense=(req,res,next)=>{
   const inputDescription=req.body.description;
   const inputCategory=req.body.category;
   const inputPrice=req.body.money;

   Expense.create({
       money:inputPrice,
       description:inputDescription,
       category:inputCategory
   })
   .then(result=>{
       const obj=result.dataValues;
       return res.status(200).json({success:true,message:'Expense added',obj})
   }).catch(err=>{
       return res.status(400).json({success:false,message:'Something went wrong'})
   })
}

exports.getExpense=(req,res,next)=>{
    Expense.findAll({
        attributes:['id','money','description','category']
    }).then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(400).json({success:false,message:'something went wrong'})
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