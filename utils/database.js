const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense','root','*10Ard.#',{
    dialect: 'mysql',
    host:'localhost'
})
module.exports=sequelize;