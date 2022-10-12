const Expense = require("../model/expense");
const User = require("../model/user");
const FilesDownloaded=require('../model/filesDownloaded')

const AWS=require("aws-sdk")


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
  req.user.createFilesDownloaded({
      fileUrl: fileUrl
  });
  res.status(200).json({fileUrl,success:true})
  }catch(err){
    console.log(err);
    res.status(500).json({success:false,err})
  }


  

}


exports.addExpense = (req, res, next) => {
  let userRes;
  const inputDescription = req.body.description;
  const inputCategory = req.body.category;
  const inputPrice = req.body.money;
  console.log(inputCategory, inputDescription, inputPrice);
  console.log(req.user.dataValues.id);

  console.log(req.user);

  User.findByPk(req.user.dataValues.id)
    .then((user) => {
      userRes = user;
      console.log(user);

      console.log("17");

      return user.update({ totalExpense: user.totalExpense + +inputPrice });
    })
    .then((data) => {
      return userRes.createExpense({
        money: inputPrice,
        description: inputDescription,
        category: inputCategory,
      });
    })
    .then((result) => {
      const obj = result.dataValues;
      return res
        .status(200)
        .json({ success: true, message: "Expense added", obj });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong" });
    });
};

exports.getExpense = (req, res, next) => {
  console.log(req.user);
  Expense.findAll({
    where: { UserId: req.user.dataValues.id },
  })
    .then((data) => {
      User.findByPk(req.user.dataValues.id).then((user) => {
        console.log(user);
        if (user.dataValues.isPremiumUser == true) {
          return res
            .status(200)
            .json({ success: true, isPremiumUser: true, data });
        }
        return res
          .status(200)
          .json({ success: true, isPremiumUser: false, data });
      });
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ success: false, message: "something went wrong" });
    });
};

exports.deleteExpense = (req, res, next) => {
  let id = req.params.expenseId;
  Expense.destroy({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.status(200).json({ success: true, message: "deleted Successfully" });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: "something went wrong" });
    });
};

exports.getAllExpense = (req, res, next) => {
  User.findAll({ attributes: ["id", "name", "totalExpense"] })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: "something went wrong" });
    });
};

exports.showExpense = (req, res, next) => {
  let userId = req.params.id;
  console.log("77");
  User.findAll({
    where: {
      id: userId,
    },
  })
    .then((user) => {
      let data;
      console.log(user);
      data = user[0].getExpenses().then((data) => {
        res
          .status(200)
          .json({ success: true, messagee: "got data successfully", data });
      });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, message: "something went wrong", err });
    });
};
