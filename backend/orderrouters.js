/* eslint-disable no-undef */
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from './models/ordermodel';
import User from './models/usermodels';
import Product from './models/productmodel';
import { isAdmin, isAuth } from './utils';



const orderrouter = express.Router();
orderrouter.get('/summary',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const orders = await Order.aggregate([

        {
            $group:{
                _id:null,
                numOrders:{$sum:1},
                numSales:{$sum:'$totalprice'},
            }
        }
    ]);
    const users = await User.aggregate([
        {
            $group:{
                _id:null,
                numUsers:{$sum:1},

            }

        }
    ])
    const dailyorders=await Order.aggregate([
        {
            $group:{
                _id:{$dateToString:{format:'%Y-%m-%d',date:'$createdAt'}},
                
                sales:{$sum:'$totalprice'}
            }
        }
    ])
    const productchart= await Product.aggregate([
        {
            $group:{
                _id:'$category',
                count:{$sum:1}

            }
        }
    ])
    res.send({users,orders,dailyorders,productchart})

}))

orderrouter.get('/',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const order = await Order.find({}).populate('user');
    res.send(order);

}))

orderrouter.get('/mine',isAuth,expressAsyncHandler(async(req,res)=>{
    const order = await Order.find({
        user:req.user._id
    })
    res.send(order);
})
)
orderrouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order)

    } else {
        res.status(404).send({ message: 'order not found' });
    }
}))

orderrouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {

    const order = new Order({
        orderitems: req.body.orderitems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsprice: req.body.itemsprice,
        textprice: req.body.textprice,
        shippingprice: req.body.shippingprice,
        totalprice: req.body.totalprice,

    })
    const createdorder = await order.save()
    if (!order) {
        res.status(401).send({ message: 'problem' })

    } else {
        res.status(201).send({ order: createdorder })
        // eslint-disable-next-line no-alert
        alert('created your order');
    }




}))
orderrouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment.paymentresult = {
            payerID: req.body.payerID,
            paymentID: req.body.paymentID,
            orderID: req.body.orderID
        };
        const updated = await order.save();
        res.send({ message: 'order paid', order: updated })

    } else {
        res.status(404).send({ message: 'order not found' })
    }

}))
orderrouter.put('/:id/deliver', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDeliverd = true;
        order.deliverdAt = Date.now();
        const updatedorder = await order.save();
        res.send({ message: 'order delivered', order: updatedorder })

    } else {
        res.status(404).send({ message: 'order not found' })
    }

}))
orderrouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
    const deleteorder = await Order.findById(req.params.id)
    if (deleteorder) {
        const sucss = await deleteorder.remove()
        res.send({message:'order is deleted',deleteorder:sucss})
        
    }else{
        res.status(404).send({message:'order not found'})

    }
}))


export default orderrouter;