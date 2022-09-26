const express = require('express');

const router = express.Router();

const expenseController=require('../controller/expense');

router.post('/addExpense',expenseController.addExpense);
router.get('/getExpense',expenseController.getExpense);
router.delete('/deleteExpense/:expenseId',expenseController.deleteExpense)

module.exports=router;

