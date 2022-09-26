const express = require('express')
const app = express()
const path=require('path');
const bodyParser = require('body-parser');
const sequelize=require('./utils/database')
const user=require('./model/user');
const expenseRoutes=require('./router/Expense')


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.json());

const userRoutes=require('./router/user')
app.use('/',userRoutes)
app.use('/expense',expenseRoutes);





sequelize.sync({alter:true})
.then(res=>app.listen(3000))
.catch(err=>console.log(err))

