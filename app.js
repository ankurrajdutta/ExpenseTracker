const express = require('express')
const app = express()
const path=require('path');
const bodyParser = require('body-parser');
const sequelize=require('./utils/database')
const user=require('./model/user');
const expense=require('./model/expense')
const expenseRoutes=require('./router/Expense')


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json());

const userRoutes=require('./router/user')
app.use('/',userRoutes)
app.use('/expense',expenseRoutes);




user.hasMany(expense);
expense.belongsTo(user)


sequelize.sync()
.then(res=>app.listen(3000))
.catch(err=>console.log(err))

