// const Sequelize = require("sequelize");

// const sequelize = require("../utils/database");

// const expense = sequelize.define("Expense", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   money: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = expense;

let mongoose=require('mongoose');

let expenseSchema = new mongoose.Schema({
  money: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports=mongoose.model('Expense',expenseSchema);