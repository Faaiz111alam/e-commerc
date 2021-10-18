
// import { update } from "../api";
import checkoutsteps from "../components/checkoutsteps";
import { getdata, getshipping, setshipping } from "../localstorage";




const shippingscreen = {


  after_render: () => {



    document.getElementById('shipping-form').addEventListener('submit', (e) => {
      e.preventDefault()
      setshipping({
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postalcode: document.getElementById('postalcode').value,
        country: document.getElementById('country').value
      });
      document.location.hash = '/payment'
    })



  },

  render: () => {
    const { name } = getdata();
    if (!name) {
      document.location.hash = '/'

    }
    const { address, postalcode, city, country } = getshipping();
    return `
        ${checkoutsteps.render({ step1: true, step2: true })}
        <div class='shipform-container'>
        <form id="shipping-form">
        <ul class='form-items'>
        <li>
        <h1>
      shipping
        </h1>
        </li>
        <li>
          <label for="address">address</label>
          <input type="text" name="address" id="address" value="${address}"/>
        </li>
        <li>
          <label for="city">city</label>
          <input type="text" name="city" id="city" value="${city}"/>
        </li>
        <li>
          <label for="postalcode">postalcode</label>
          <input type="text" name="postalcode" id="postalcode" value="${postalcode}"/>
        </li>
        <li>
          <label for="country">country</label>
          <input type="text" name="country" id="country" value="${country}"/>
        </li>
        
        <li>
        <button type="submit"class="primary">Continue</button>
        </li>
        
       



        </ul>

        </form>


        </div>
        
        
        
        `
  }
}
export default shippingscreen;