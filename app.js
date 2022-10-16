const express = require('express')
const app = express()
const path=require('path');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();


const sequelize=require('./utils/database')
const user=require('./model/user');
const expense=require('./model/expense')
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
app.use('/password',forgotPasswordRoutes)




user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user)


user.hasMany(ForgotPassword);
ForgotPassword.belongsTo(user);


user.hasMany(filesDownloaded);
filesDownloaded.belongsTo(user)

sequelize.sync()
.then(res=>app.listen(3000))
.catch(err=>console.log(err))

