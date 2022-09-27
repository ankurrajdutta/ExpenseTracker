const express = require('express');

const router = express.Router();

const expenseController=require('../controller/expense');
const Authenticate=require('../middleware/authentication')

router.post('/addExpense',Authenticate.authenticate,expenseController.addExpense);
router.get('/getExpense',Authenticate.authenticate,expenseController.getExpense);
router.delete('/deleteExpense/:expenseId',expenseController.deleteExpense)

module.exports=router;

