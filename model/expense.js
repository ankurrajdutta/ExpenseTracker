const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const expense=sequelize.define('Expense',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    money:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=expense