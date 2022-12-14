const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const forgotPasswordRequest=sequelize.define('forgotPasswordRequest',{
    id:{
        type:Sequelize.UUID,
        primaryKey: true
    },
    isActive:{
        type:Sequelize.BOOLEAN,
    }
})

module.exports=forgotPasswordRequest;