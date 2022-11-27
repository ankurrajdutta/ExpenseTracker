const express = require('express')
const app = express()
const path=require('path');
const dotenv = require("dotenv");
const mongoose=require('mongoose')
dotenv.config();


// const sequelize=require('./utils/database')
const user=require('./model/user');

const order=require('./model/order');
const ForgotPassword=require('./model/forgotPasswordRequest')
const FilesDownloaded=require('./model/filesDownloaded')


const expenseRoutes=require('./router/Expense')
const purchaseRoutes=require('./router/purchase');
const forgotPasswordRoutes=require('./router/forgotPassword');



app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json());

const userRoutes=require('./router/user');
const filesDownloaded = require('./model/filesDownloaded');
app.use('/',userRoutes)
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
// app.use('/password',forgotPasswordRoutes)




// user.hasMany(expense);
// expense.belongsTo(user);

// user.hasMany(order);
// order.belongsTo(user)


// user.hasMany(ForgotPassword);
// ForgotPassword.belongsTo(user);


// user.hasMany(filesDownloaded);
// filesDownloaded.belongsTo(user)

 mongoose.connect(
   "mongodb+srv://Ankur:f5heVMRr5lzQuOqs@cluster0.z6ddirp.mongodb.net/expense-tracker"
 )
.then(res=>app.listen(3000))
.catch(err=>console.log(err))

