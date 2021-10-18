import { deliverorder, getorder, getpaypalclientid, payorder } from "../api";
import { getdata } from "../localstorage";



import { hidloading, parseRequestUrl, rerender, showloading } from "../utils";

const addpaypalsdk = async (totalprice) => {
    const clientId = await getpaypalclientid();
    showloading();
    if (!window.paypal) {
        const script = document.createElement('script')
        script.type = 'text/javascript';
        script.src = "https://www.paypalobjects.com/api/checkout.js";
        script.async = true;
        script.onload = () => handlepayment(clientId, totalprice)
        document.body.appendChild(script);

    } else {
        handlepayment(clientId, totalprice)
    }
};
const handlepayment = (clientId, totalprice) => {
    window.paypal.Button.render({
        env: 'sandbox',
        client: {
            sandbox: clientId,
            production: '',



        },
        locale: 'en_US',
        style: {
            size: 'responsive',
            color: 'gold',
            shape: 'pill',
        },
        commit: true,
        payment(data, actions) {
            return actions.payment.create({
                transactions: [

                    {
                        amount: {
                            total: totalprice,
                            currency: 'USD',
                        },
                    },
                ],
            });
        },
        onAuthorize(data, actions) {
            return actions.payment.execute().then(async () => {
                showloading();
                await payorder(parseRequestUrl().id, {
                    orderID: data.orderID,
                    payerID: data.payerID,
                    paymentID: data.paymentID
                })
                hidloading();
                alert('was succes')

                rerender(orderscreen);
            })
        }
    }, '#paypal-button'
    ).then(() => {
        hidloading();
    });

}







const orderscreen = {
    after_render:async () => {

        const request = parseRequestUrl();
        document.getElementById('de-order-button').addEventListener('click',async()=>{
            showloading()
            await deliverorder(request.id)
            alert("been deliverd")
            rerender(orderscreen)
            hidloading();

        })
     },




    render: async () => {
        const request = parseRequestUrl();
    const {isAdmin} = getdata()


        const {
            _id,
            orderitems,
            shippingprice,
            payment,
            itemsprice,
            shipping,
            textprice,
            totalprice,
            isDeliverd,
            deliverdAt,
            paidAt,
            isPaid,
            


        } = await getorder(request.id)

        if (!isPaid) {
            addpaypalsdk(totalprice);

        }
        return `
        <div>
       <h1> Order ${_id}</h1>
      
       
        <div class="order">
        <div class="order-info">
        <div>
        <h2>
        Shipping
        </h2>
        <div>
        ${shipping.address},${shipping.city},${shipping.postalcode},${shipping.country}
        </div>
        ${isDeliverd ? `<div class="success">Delivered at ${deliverdAt}</div>` : `<div class="error">NOt Delivered</div>`}
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
        ${paidAt ? `<div class="success">paidAt ${paidAt}</div>` : `<div class="error"> not paid</div>`}
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
       <li>
        <li> <div>items</div>
        <div>${itemsprice}</div> </li>
        <li><div>shippingprice</div>
        <div>${shippingprice}</div> </li>
        <li> <div>tax</div>
        <div>${textprice}</div> </li>
        <li> <div>order total</div>
        <div>${totalprice}</div> </li>
        <li><div id="paypal-button"></div></li>
        <li>
        ${isPaid && !isDeliverd && isAdmin ? `<button id=de-order-button class="prim">Delivered </button>`:''}

        </li>
    

        
        </li>
        </ul>
        </div>

        </div>
        </div>
        </div>
        
        
        `

    }
}
export default orderscreen;