import { parseRequestUrl, rerender } from "../utils";
import { getproduct } from "../api";
import { getcartitems, setcartitem } from "../localstorage";



const addTocard = (item, forceUpdate = false) => {
    let cartitems = getcartitems();
    const existitem = cartitems.find((x) => x.product === item.product)
    if (existitem) {
        if (forceUpdate) {

            cartitems = cartitems.map((x) => x.product === existitem.product ? item : x)
        }


    }
    else {
        cartitems = [...cartitems, item]
    }

    setcartitem(cartitems)
    if (forceUpdate) {
        rerender(cartscreen)

    }
}
// const removeFromcart = ((id) => {
//     setcartitem(getcartitems().filter((x) => x.product !== id))
//     if (id === parseRequestUrl().id) {
//         document.location.hash = '/cart';

//     } else {
//         rerender(cartscreen)
//     }

// })
const removeFromcart = ((id) => {
    setcartitem(getcartitems().filter((x) => x.product !== id))
    if (id === parseRequestUrl().id) {
        document.location.hash = '/cart'

    } else {
        rerender(cartscreen)

    }

})



const cartscreen = {
    after_render: () => {
        document.getElementById('checkout-button').addEventListener('click', () => {
            document.location.hash = '/signin'
        })
        const qtyselects = document.getElementsByClassName('select')
        Array.from(qtyselects).forEach((qtyselect) => {
            qtyselect.addEventListener('change', (e) => {
                let item = getcartitems();
                item = item.find((x) => x.product === qtyselect.id)
                addTocard({
                    ...item, qty: Number(e.target.value)
                }, true)
            })
        })

        // const deletebutt = document.getElementsByClassName('delete-button')
        // Array.from(deletebutt).forEach((delt) => {
        //     delt.addEventListener('click', () => {
        //         removeFromcart(delt.id)
        //     })
        // })
        const deletebutton = document.getElementsByClassName('delete-button')
        Array.from(deletebutton).forEach((dlet) => {
            dlet.addEventListener('click', () => {
                removeFromcart(dlet.id)
            })

        })





    },
    render: async () => {
        const request = parseRequestUrl()
        if (request.id) {
            const product = await getproduct(request.id);
            addTocard({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,



            })


        }


        const cartitems = getcartitems();
        return `
        <div class="cartlist">
        <div class="cartlisthaed">
        <ul class="list-container">
        <li>
        <h3>
        Shopping cart
        </h3>
        <div>
        Price
        </div>
     
         </li>
         ${cartitems.length === 0 ? ' <div> <a href="/#/"> cart is empty Go to shopping </a> </div>' : cartitems.map((pro) => `
         <li>
       
        <div class="cart-image">
          <img src="${pro.image}" alt="${pro.name}"/>
        </div>
        <div class="name">
        ${pro.name}
        </div>
        <div>
        QTY:

        <select class="select" id=${pro.product}>
       ${[...Array(pro.countInStock).keys()].map((x) => x + 1 === pro.qty ?
            `<option selected value="${x + 1}">${x + 1}</option>` : `<option value="${x + 1}">${x + 1}</option>`)
            }

        </select>
        <button type="button" class="delete-button" id=${pro.product}>
        Delete

        </button>
        </div>
        <div class="price-cart">
        $${pro.price}
        </div>

        </li>


        `).join('\n')
            }

        </ul>
        <div class="cart-action">
        <h3>
      subtotal(${cartitems.reduce((a, c) => a + c.qty, 0)}items):
      $${cartitems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button class="primary fw" id="checkout-button">
      proccess to checkout
      </button>
      </div>





        </div>
        </div>
        </div>



        `





    }
};
export default cartscreen;



