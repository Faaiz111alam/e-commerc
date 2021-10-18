import { getorderpro } from '../api';
import Rating from '../components/rating';
import { parseRequestUrl } from '../utils';

const HomeScreen = {
    render: async () => {
        // showloading()
        const {value} = parseRequestUrl()
        const products = await getorderpro({ searchKeyword:value });
        if (products.error) {
            return `<div>${products.error}</div>`

            
        }

        // const response = await axios({
        //     url: "http://localhost:8000/postman/products",
        //     headers: {
        //         "Content-Type": "applications/json",
        //     },
        // })
        // if (!response || response.statusText !== 'OK') {
        //     return ` <div> error in getting data</div>`;
        // }
        // const products = response.data;
        // hidloading()

        return `
          <ul class="products">
         ${products.map(product => `
          <div class="homesbox">
         <div class="product">
         <a href="/#/product/${product._id}">
             <img src="${product.image}" alt="${product.name}">

         </a>
         
         <div class="product-name">
             <a href="/#/product/${product._id}">${product.name}
             </a>
         </div>
         <div class ="product-rating">
         ${Rating.render({ value: product.rating, text: product.numReviews + 'reviews' })}
         </div>
         <div class="product-brand">
         ${product.brand}
         </div>
         <div class="product-price">
             ${product.price}
         </div>

       </div>

       </div>
         
         `).join('\n')}
        `
    }
}
export default HomeScreen;