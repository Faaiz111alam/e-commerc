import { createorder } from "../api";
import checkoutsteps from "../components/checkoutsteps";
import { clencart, getcartitems, getpayment, getshipping } from "../localstorage"
import { hidloading, showloading } from "../utils";

const convercartorder = () => {


    const orderitems = getcartitems();
    if (!orderitems.length === 0) {
        document.location.hash = '/cart'

    }
    const shipping = getshipping()
    if (!shipping.address) {
        document.location.hash = '/shipping'

    }
    const payment = getpayment();
    if (!payment.paymentMethod) {
        document.location.hash = '/payment';

    }
    const itemsprice = orderitems.reduce((a, c) => a + c.price * c.qty, 0)
    const shippingprice = itemsprice > 100 ? 0 : 10
    const textprice = Math.round(0.15 * itemsprice * 100) / 100
    const totalprice = itemsprice + shippingprice + textprice;
    return {

        orderitems,
        shippingprice,
        payment,
        itemsprice,
        shipping,
        textprice,
        totalprice,

    }

}





const placeorderscreen = {
    after_render: async () => {
        document.getElementById('place-order').addEventListener('click', async () => {

            const order = convercartorder();
            showloading();
            const data = await createorder(order)
            hidloading();
            if (data.error) {
                alert('problem')

            } else {
                clencart();
                document.location.hash = '/order/' + data.order._id
            }
        })

    },




    render: () => {
        const {
            orderitems,
            shippingprice,
            payment,
            itemsprice,
            shipping,
            textprice,
            totalprice, } = convercartorder();
        return `
        <div>
        ${checkoutsteps.render({ step1: true, step2: true, step3: true, step4: true, })}
        <div class="order">
        <div class="order-info">
        <div>
        <h2>
        Shipping
        </h2>
        <div>
        ${shipping.address},${shipping.city},${shipping.postalcode},${shipping.country}
        </div>
        <div>
        <div>
        
        </div>
        </div>
        <div>
        <h2>
        Payment Method
        </h2>
        <div>
        paymentMethod:${payment.paymentMethod}
        </div>
        </div>
        <div>
        <ul class="cart-list">
        <li>
        <h2>
        shopping cart
        </h2>
        <div>price</div>
        
        </li>
        ${orderitems.map((item) => `
          <li>
          <div class="img">
           <img src="${item.image}" alt="${item.name}"/>

          </li>
          </div>

          <div class='cart-itsm'>
          <div>
          <a href="/#/product/${item.product}">${item.name}</a>

          </div>
          <div>
          QTY:${item.qty}
          </div>
          <div class="price">
          Price:$${item.price}
          </div>
          </div>







        `)}

        </ul>
        </div>
        <div>
        <div class="cart_action">
        Order Action
        <ul>
        <li>
        <h2>order summary</h2>

        </li>
        <li>
       <li> <div>items</div>
        <div>${itemsprice}</div> </li>
        <li><div>shippingprice</div>
        <div>${shippingprice}</div> </li>
        <li> <div>tax</div>
        <div>${textprice}</div> </li>
        <li> <div>order total</div>
        <div>${totalprice}</div> </li>
        <button type="button" id="place-order" class="primary">Place order </button>

        
        </li>
        </ul>
        </div>

        </div>
        </div>
        </div>
        
        
        `

    }
}
export default placeorderscreen;