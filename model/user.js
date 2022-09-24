const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const User=sequelize.define('User',{
    name:{
        type:Sequelize.STRING,
    },
    email:{
        type:Sequelize.STRING,
        unique:true

    },
    password:{
        type:Sequelize.STRING
    }
})

module.exports=User