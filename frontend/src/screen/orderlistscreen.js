
import dashboardmenu from "../components/dashboardmenu";
import {createorder, deleteOrder, getorders} from '../api';
import { hidloading, rerender, showloading } from "../utils";


 export const orderlist ={
   after_render:()=>{
      hidloading();
   //   document.getElementById('create-order').addEventListener('click',async()=>{
   //      const data =await createorder();
        
   //      document.location.hash=`/order/${data.order._id}/edits`;
       
       


   //   })
   //   const editbutton =document.getElementsByClassName("editt")

   //     Array.from(editbutton).forEach((editbuttonfunc)=>{
   //       editbuttonfunc.addEventListener('click',()=>{
   //          document.location.hash=`/order/${editbuttonfunc.id}/edits`;
   //       })

   //     })
   const deletebutton =document.getElementsByClassName("delete")
   Array.from(deletebutton).forEach((x)=>{
      x.addEventListener('click',async()=>{
         if (confirm('Are you sure you want to delete product ?')) {
            showloading();
            await  deleteOrder(x.id)
            hidloading();
            rerender(orderlist);
            
         }
      })

   })
   const editbutton =document.getElementsByClassName("editt")
   Array.from(editbutton).forEach((x)=>{
      x.addEventListener('click',async()=>{
        document.location.hash=`/order/${x.id}`;
        hidloading()
      })

   })
     

  },

    render: async()=>{
        const orders = await getorders()
       
      return `
      
    
      <div class="dashboard">
      ${dashboardmenu.render({selected:'order'})}
      <div class="dashboard-content">
      <h1> Dashboard</h1>
      <button id="create-order"> Create order </button>   
      <div class="order-list">
       <table>
       <thead>
       <tr>
       <th>Id</th>
       <th>DATE</th>
       <th>TOTAL</th>
       <th>USER</th>
       <th>PAID AT</th>
       <th>DELIVERD AT</th>
       </tr>
       </thead>
       <tbody>
      ${orders.map((order)=>`

    <tr>
    <td>${order._id}</td>
    <td>${order.createdAt}</td>
    <td>${order.totalprice}</td>
    <td>${order.user.name}</td>
    <td>${order.paidAt||'no'}</td>
   <td> <button id="${order._id}" class="editt"> edit</button></td>
   <td> <button id="${order._id}" class="delete"> Delete</button></td>
   </tr>


      `).join('\n')}
      </tbody>
      </table>
       
      </div>
      <div>

       
   </div>
      
      `


    }
    
 }
// export const orderlist ={
//     render:()=>{
//         return `
//         hello
//         `
//     }

// }