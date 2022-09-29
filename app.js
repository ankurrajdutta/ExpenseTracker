const express = require('express')
const app = express()
const path=require('path');
const bodyParser = require('body-parser');
const sequelize=require('./utils/database')
const user=require('./model/user');
const expense=require('./model/expense')
const order=require('./model/order')
const expenseRoutes=require('./router/Expense')
const purchaseRoutes=require('./router/purchase')
const dotenv = require('dotenv');
dotenv.config();


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json());

const userRoutes=require('./router/user')
app.use('/',userRoutes)
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);




user.hasMany(expense);
expense.belongsTo(user);

user.hasMany(order);
order.belongsTo(user)


sequelize.sync()
.then(res=>app.listen(3000))
.catch(err=>console.log(err))

