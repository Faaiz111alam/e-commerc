/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose"

import path from 'path';
import userrouter from './userroutes';
// eslint-disable-next-line import/order
import bodyParser from 'body-parser';
import config from './config';
import orderrouter from './orderrouters';
import productsrouter from './productrouter';
import uploadrouter from './uploadrouter';







const good = mongoose.connect(config.MONGODB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('connected')
}).catch((error) => {
    console.log(error.reason)

})










// eslint-disable-next-line import/order





const app = express();
app.use(cors());
app.use(bodyParser.json())



// eslint-disable-next-line no-undef
app.use('/postman/userss', userrouter)
app.use('/postman/products',productsrouter)
app.use('/postman/orders', orderrouter);
app.use('/postman/uploads',uploadrouter)
app.get('/postman/paypal/clientId', (req, res) => {
    res.send({ clientId: config.PAYPAL_CLIENT_ID })

})
app.use(express.static(path.join(__dirname,'/../frontend')))

app.use('/uploadss', express.static(path.join(__dirname,'/../uploadss')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/../frontend/index.html'))
})



// app.get('/postman/products', (req, res) => {
//     res.send(data.products);
// });
// app.get('/postman/products/:id',(req, res) => {
 
//     const product = data.products.find(x => x._id === req.params.id)
//     if (product) {
//         res.send(product);


//     }
//     else {
//         res.status(404).send({ message: 'product not found!' })
//     }

// })


app.use((err, req, res, next) => {
    const status = err.name && err.name === 'validationError' ? 400 : 500;
    res.status(status).send({ message: err.message })

})


app.listen(config.PORT, () => {
    console.log('serve at http://localhost:8000');
});
