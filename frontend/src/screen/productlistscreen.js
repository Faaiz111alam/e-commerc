
import dashboardmenu from "../components/dashboardmenu";
import { createProduct, deleteProduct, getorderpro } from '../api';
import { hidloading, parseRequestUrl, rerender, showloading } from "../utils";


 export const productlist ={
   after_render:()=>{
      hidloading();
     document.getElementById('create-pro').addEventListener('click',async()=>{
        const data =await createProduct();
        
        document.location.hash=`/product/${data.productid._id}/edits`;
       
       


     })
     const editbutton =document.getElementsByClassName("editt")

       Array.from(editbutton).forEach((editbuttonfunc)=>{
         editbuttonfunc.addEventListener('click',()=>{
            document.location.hash=`/product/${editbuttonfunc.id}/edits`;
         })

       })
   const deletebutton =document.getElementsByClassName("delete")
   Array.from(deletebutton).forEach((x)=>{
      x.addEventListener('click',async()=>{
         if (confirm('Are you sure you want to delete product ?')) {
            showloading();
            await  deleteProduct(x.id)
            hidloading();
            rerender(productlist);
            
         }
      })

   })
     

  },

    render: async()=>{
      const {value} = parseRequestUrl
        const products = await getorderpro({searchKeyword:value})
       
      return `
      
    
      <div class="dashboard">
      ${dashboardmenu.render({selected:'product'})}
      <div class="dashboard-content">
      <h1> Dashboard</h1>
      <button id="create-pro"> Create pro </button>   
      <div class="prod-list">
       <table>
       <thead>
       <tr>
       <th>Id</th>
       <th>Name</th>
       <th>Price</th>
       <th>Catogery</th>
       <th>Brand</th>
       <th>Action</th>
       </tr>
       </thead>
       <tbody>
      ${products.map((product)=>`

    <tr>
    <td>${product._id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.category}</td>
    <td>${product.brand}</td>
   <td> <button id="${product._id}" class="editt"> edit</button></td>
   <td> <button id="${product._id}" class="delete"> Delete</button></td>


      `).join('\n')}
      </tbody>
      </table>
       
      </div>
      <div>

       
   </div>
      
      `


    }
    
 }