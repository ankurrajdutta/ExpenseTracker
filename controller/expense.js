const Expense = require("../model/expense");
const User = require("../model/user");
const FilesDownloaded=require('../model/filesDownloaded')

const AWS=require("aws-sdk");
const user = require("../model/user");


function uploadToS3(data,fileName){

  let s3Bucket = new AWS.S3({
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  });

  
    var params = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: data,
      ACL: "public-read",
    };
    return new Promise((resolve,reject)=>{
      s3Bucket.upload(params, (err, s3response) => {
        if (err) {
          console.log("something went wrong", err);
          reject(err)
        }
        else {
          console.log("success", s3response);
          resolve(s3response.Location);
        }
      });
    })
    
  
}


exports.downloadExpense=async(req,res,next)=>{

  try{
    const expenses=await req.user.getExpenses();
  const stringifiedExpenses=JSON.stringify(expenses);
  const userId=req.user.id;

  const fileName=`Expense${userId}/${new Date()}.txt`;
  const fileUrl=await uploadToS3(stringifiedExpenses,fileName);
  req.user.updateOne({_id:req.user._id},{$set:{fileUrl:fileUrl}})
  res.status(200).json({fileUrl,success:true})
  }catch(err){
    console.log(err);
    res.status(500).json({success:false,err})
  }


  

}


exports.addExpense = (req, res, next) => {
  console.log('addExpense')
  
  const inputDescription = req.body.description;
  const inputCategory = req.body.category;
  const inputPrice = req.body.money;
  let updatedExpense=req.user.totalExpense+ +inputPrice;
  let updatednoOfExpense=req.user.noOfExpense+ 1;
  User.updateOne({_id:req.user._id},{$set:{totalExpense:updatedExpense,noOfExpense:updatednoOfExpense}}).then(user=>{
    let expense=new Expense({
      description:inputDescription,
      category:inputCategory,
      money:inputPrice,
      user_id:req.user._id
    })
   return expense.save();
  })
    .then((result) => {
      let obj=result
      console.log('result',result)
      return res
        .status(200)
        .json({ success: true, message: "Expense added", obj });
    })
    .catch((err) => {
      console.log(err)
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong" });
    });
};



exports.getExpense = (req, res, next) => {
  console.log('in getExpense')
  let page=req.query.page;
  let ITEMS_PER_PAGE = +req.query.limit;
  let data;
  console.log(ITEMS_PER_PAGE)
  
  // const ITEMS_PER_PAGE=2;
  console.log(req.user);
  let totalItems;
    Expense.find({ user_id: req.user._id })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .then((items) => {
       
        totalItems = req.user.noOfExpense;
        data = items;
        if (req.user.isPremiumUser == true) {
          return res.status(200).json({
            success: true,
            isPremiumUser: true,
            expense: data,
            pagination: {
              currentPage: +page,
              hasNextPage: ITEMS_PER_PAGE * page < totalItems,
              hasPreviousPage: page > 1,
              nextPage: +page + 1,
              previousPage: +page - 1,
              lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
            },
          });
        }
        return res.status(200).json({
          success: true,
          isPremiumUser: false,
          expense: data,
          pagination: {
            currentPage: +page,
            hasNextPage: ITEMS_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
            lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
          },
        });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(400)
          .json({ success: false, message: "something went wrong" });
      });
   };


exports.deleteExpense = (req, res, next) => {
  console.log('in delete Expense')
  let id = req.params.expenseId;
  console.log('delete id',id)
  // Expense.destroy({
  //   where: {
  //     id: id,
  //   },
  // })
  let deletedPrice;
  Expense.findOneAndRemove({_id:id}).then(expense=>{
    console.log(expense)
    deletedPrice=+expense.money;
    console.log(deletedPrice)
    return User.findOne({_id:expense.user_id})
  }).then(user=>{
    console.log(user)
    let updatedTotalExpense=user.totalExpense-deletedPrice;
    let updatednoOfExpense=user.noOfExpense-1;
    return User.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          totalExpense: updatedTotalExpense,
          noOfExpense: updatednoOfExpense,
        },
      }
    );
  })
    .then((result) => {
      res.status(200).json({ success: true, message: "deleted Successfully" });
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({ success: false, message: "something went wrong" });
    });
};

exports.getAllExpense = (req, res, next) => {
  // User.findAll({ attributes: ["id", "name", "totalExpense"] })
  User.find({})
    .then((data) => {
      console.log(data)
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: "something went wrong" });
    });
};

exports.showExpense = (req, res, next) => {
  let userId = req.params.id;
  console.log("77");
  // User.findAll({
  //   where: {
  //     id: userId,
  //   },
  // })
  Expense.find({user_id:userId})
    .then((data) => {
        res
          .status(200)
          .json({ success: true, messagee: "got data successfully", data });
      })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, message: "something went wrong", err });
    });
};
