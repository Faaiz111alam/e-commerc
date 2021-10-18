
import { getmyorder, update } from "../api";
import { clearstorage, getdata, setdata } from "../localstorage";
import { hidloading, showloading } from "../utils";




const profilescreen = {


    after_render: () => {
        document.getElementById('signout').addEventListener('click', () => {
            clearstorage();
            document.location.hash = '/'
        })
        document.getElementById('profile-form').addEventListener('submit', async (e) => {
            e.preventDefault();

            showloading()
            const datas = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,

            })
            hidloading()

            if (datas.error) {

                alert(datas.error)



            } else {
                setdata(datas)
                document.location.hash = '/'
            }

        })



    },
    render: async () => {
        const { name, email, _id } = getdata();
        if (!name) {
            document.location.hash = '/'

        }
        const orders =await getmyorder()
        return `
        <div class="profile">
        <div class="profile-info">
       
        <div class='form-container'>
        <form id="profile-form">
        <ul class='form-items'>
        <li>
        
        </li>
        <li>
          <label for="email">Name</label>
          <input type="name" name="name" id="name" value="${name}"/>
        </li>
        <li>
          <label for="email">Email</label>
          <input type="email" name="email" id="email"  value="${email}"/>
        </li>
        <li>
        <label for="password"> password </label>
        
        <input type="password" name="password" id="password"/>
        </li>
        <li>
        <button type="submit" class="primary">update</button>
        </li>
        
        <li>
        <button type="button" id="signout">signout</button>
      </li>
        
        
        
        </ul>
        
        </form>
     


        </div>
        </div>
        <div class="profile-orders">
        <table>
        <thead>
        <tr>
        <th> ORDER ID</th>
        <th> DATE</th>
        <th> TOTAL</th>
        <th> paid</th>
        <th>Deleiverd </th>
        <th>Action </th>
        
        <tr>
        </thead>
        <tbody>
        ${orders.length===0?`<tr><td colspan="6">No order found</td></tr>`:orders.map(order=>`
        <tr>
        <td>${order._id}</td>
        <td>${order.createdAt}</td>
        <td>${order.totalprice}</td>
        <td>${order.paidAt||'NO'}</td>
        <td>${order.deliveredAt||'NO'}</td>
        <td><a href="/#/oreders/${order._id}">Details</a></td>
           </tr>
          
        `).join('\n')
    }
        </tbody>
        </table>

        </div>
        </div>
        
        
        
        `
    }
}
export default profilescreen;