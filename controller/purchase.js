const Razorpay = require('razorpay');
const Order = require('../model/order');
const User=require('../model/user')


const purchasepremium =async (req, res) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500;

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err) {
                throw new Error(err);
            }
            req.user.order.orderid=order.id;
            req.user.order.status="PENDING";
            return req.user.save()
            .then(() => {
                return res.status(201).json({ order, key_id : rzp.key_id});

            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch(err){
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err})
    }
}

 const updateTransactionStatus = (req, res ) => {
    try {
        const { payment_id, order_id} = req.body;
        User.findOne({_id:req.user._id}).then(user=>{
            user.order.paymentid=payment_id;
            user.order.status='SUCCESSFUL';
            return user.save();
        }).then(user=>{
            user.isPremiumUser=true;
            return user.save();
        })
       .then(() => {
               
             return res.status(202).json({sucess: true, message: "Transaction Successful"});
            }).catch((err)=> {
                throw new Error(err);
            })
        
    } catch (err) {
        console.log(err);
        res.status(403).json({ errpr: err, message: 'Something went wrong' })

    }
}

module.exports = {
    purchasepremium,
    updateTransactionStatus
}