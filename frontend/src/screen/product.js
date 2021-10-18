import { getproduct } from '../api';
import Rating from '../components/rating';
import { hidloading, parseRequestUrl, showloading } from '../utils';


const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById("add-button").addEventListener('click', () => {
            document.location.hash = `/cart/${request.id}`;

        })



    },
    render: async () => {
        showloading()
        const request = parseRequestUrl();
        const product = await getproduct(request.id);
        if (product.error) {
            return `<div>${product.error}</div>`

        }
        hidloading()

        return `<div class= "content">

           <div class="back-to-result">
            <a href="/#/">BACK TO RESULT</a>
           
           </div>
           <div class="deatils"> 
           <div class= "ideatils-image"> 
           <img src="${product.image}" alt="{product.name}"/>
           <div class ="con-deat-ino">

           <div class="deatils-inf">
           <ul>
           <li>
            <h1>${product.name}</h1>


           </li>
           <li>
           ${Rating.render({ value: product.rating, text: product.numReviews + 'review' })}
           </li>
           <li>
           Price:<strong>$${product.price}</strong>
           </li>
           <li>

           Description:
           <div>
           ${product.description}
           </div>
           </li>

           </ul>

           
           
           </div>
           <div class = "deatils-action">
           <ul>
           <li>
           price:$${product.price}
           </li>
           <li>
           status:
           ${product.countInStock > 0 ? `<span class="success">In Stock </span>` : `<span class="error">Unavalible</span>`}
           </li>
           <li>
           <button id="add-button" class = "primary">Add to cart </button>
           </li>
           </ul>
           </div>

           </div>
           
        
        
        </div>`
    }

};
export default ProductScreen;