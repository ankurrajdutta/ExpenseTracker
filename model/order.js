const Sequelize=require('sequelize');

const sequelize=require('../utils/database');

const order=sequelize.define('Order',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    orderid:{
        type:Sequelize.STRING
    },
    paymentid:{
        type:Sequelize.STRING
    },
    status:{
        type:Sequelize.STRING
    }
})

module.exports=order;