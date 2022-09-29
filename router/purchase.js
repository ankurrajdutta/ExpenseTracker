const express = require('express');

const router = express.Router();

const purchaseController=require('../controller/purchase');
const authorization=require('../middleware/authentication')

router.get('/premiummembership',authorization.authenticate,purchaseController.purchasepremium)
router.post('/updatetransactionstatus',authorization.authenticate,purchaseController.updateTransactionStatus)

module.exports=router