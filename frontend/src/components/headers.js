import { getdata } from "../localstorage"
import { parseRequestUrl } from "../utils";

const headers = {

    after_render: () => {


     document.getElementById('search-from').addEventListener('submit',async(e)=>{
         e.preventDefault();
         const searcheyword=document.getElementById('q').value;
         document.location.hash=`/?=${searcheyword}`;

     })
     document.getElementById('aside-open').addEventListener('click',async()=>{
       document.getElementById('aside-co').classList.add('open')

     })


    },


    render: (() => {
        const { name,isAdmin} = getdata();
        const {value} =parseRequestUrl()

        return `
        
        <div class="brand">
        <button id="aside-open">
        &#9776;
        </button>
        <a href="/#/">Amazon</a> 
        </div>
        <div class="search">
         <form class="search-form" id="search-from">
         <input type="text" name="q" id="q" value="${value ||''}"/>
         <button  class="s" type="submit"><i class="fa fa-search"></i></button>

         </form>

        </div>
        <div>
        ${name ? (`<a href="/#/profile">${name}</a>`) : `<a href="/#/signin">Sign-in</a>`}
        <a href="/#/cart">Cart</a>
        ${isAdmin? `<a href="/#/dashboard">Dashboard </a>`:''}
        
        
        
        </div>`



    }),


}
export default headers;