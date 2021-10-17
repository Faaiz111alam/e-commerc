import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderitems: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: String, required: true },
            qty: { type: String, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Data', required: true },
    shipping: {
        address: String,
        city: String,
        postalcode: String,
        country: String,
    },

    payment: {
        paymentMethod: String,
        paymentresult: {
            orderID: String,
            payerID: String,
            paymentID: String,
        },



    },
    itemsprice: Number,
    textprice: Number,
    shippingprice: Number,
    totalprice: Number,
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: Date,
    isDeliverd: { type: Boolean, required: true, default: false },
    deliverdAt: Date

},
    {
        timestamps: true,
    }

)
const Order = mongoose.model('Order', orderSchema)
export default Order;