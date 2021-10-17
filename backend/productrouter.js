import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import Product from './models/productmodel';
import { isAuth,isAdmin } from './utils';

const productsrouter =express.Router();
 productsrouter.get('/',expressAsyncHandler(async(req,res)=>{
    const searchKeyword=req.query.serchKeyword ?{
      name:{
        $regex:req.query.serchKeyword,
        $options:'i',
      }
    }:{};
   const products =await Product.find({...searchKeyword})
   res.send(products);

 }))
 productsrouter.get('/:id',expressAsyncHandler(async(req,res)=>{
   const product =await Product.findById(req.params.id)
   res.send(product);

 }))



 productsrouter.post('/',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
     const productid = new Product({
   name:'sample product',
   description:'sample des',
   category:'sample cat',
   brand:'sample brand',
   image: '/images/th.jfif',
  

     })
     const cretedproduct = await productid.save()
     if(cretedproduct){
     res.status(201).send({message:'products created', productid:cretedproduct})
     }else{
         res.status(500).send({message:'error in creating pro'})
     }
 }))
 productsrouter.put('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
   const product=await Product.findById(req.params.id)
   if (product) {
     product.name=req.body.name;
     product.price=req.body.price;
     product.image=req.body.image;
     product.brand=req.body.brand;
     product.countInStock=req.body.countInStock;
     product. category=req.body.category;
     product.description=req.body.description;
     const updateproduct = await product.save()
     if(updateproduct){
       res.send({message:'pro updated',product:updateproduct})
     }else{
       res.status(500).send({message:'was pro in updating pro'})
     }
     
     
    }
    else{
      res.status(401).send({message:'no found pro'})
    }


 }))
 productsrouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async(req,res)=>{
   const product =await Product.findById(req.params.id)
   if (product){
     const deleteProduct= await product.remove();
     res.send({message:'product is deleted',product:deleteProduct})
     
     
   }else{
     res.status(404).send({message:'product not found'})
   }

 }))
 export default productsrouter;