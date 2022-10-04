const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const User=sequelize.define('User',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
    },
    email:{
        type:Sequelize.STRING,
        unique:true

    },
    password:{
        type:Sequelize.STRING
    },
    isPremiumUser:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    totalExpense:{
        type:Sequelize.INTEGER,
        defaultValue:0
    }
})

module.exports=User