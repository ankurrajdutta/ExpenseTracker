const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const expense=sequelize.define('Expense',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    money:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=expense