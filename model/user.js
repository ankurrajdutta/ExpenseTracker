let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  isPremiumUser: {
    type: Boolean,
    default: false,
  },
  totalExpense: {
    type: Number,
    default: 0,
  },
  noOfExpense: {
    type: Number,
    default: 0,
  },
  order: {
    orderid: {
      type:String
    },
    paymentid: {
      type:String
    },
    status: {
      type: String
    }
  },
    fileUrl:{
      type:String
    }
});

module.exports=mongoose.model('User',userSchema)

// const User = sequelize.define("User", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//   },
//   email: {
//     type: Sequelize.STRING,
//     unique: true,

//   },
//   password: {
//     type: Sequelize.STRING,
//   },
//   isPremiumUser: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//   },
//   totalExpense: {
//     type: Sequelize.INTEGER,
//     defaultValue: 0,
//   },
// });

// module.exports = User;
