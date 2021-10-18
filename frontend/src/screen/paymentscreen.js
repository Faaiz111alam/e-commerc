
// import { update } from "../api";
import checkoutsteps from "../components/checkoutsteps";
import { getdata, setpayment } from "../localstorage";




const paymentscreen = {


  after_render: () => {
    document.getElementById('payment-form').addEventListener('submit', (e) => {
      e.preventDefault()
      const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value
      setpayment({ paymentMethod });
      document.location.hash = '/placeorder'
    })



  },

  render: () => {
    const { name } = getdata();
    if (!name) {
      document.location.hash = '/'

    }

    return `
        ${checkoutsteps.render({ step1: true, step2: true, step3: true })}
        <div class='shipform-container'>
        <form id="payment-form">
        <ul class='form-item'>
        <li>
        <h1>
      payment
        </h1>
        </li>
        <li>
        <div>
        <input type="radio" name="payment-method" id="paypal" value="Paypal" checked/>
        <label for="paypal"> paypal
        </label>
        </div>
        </li>
        <li>
        <div>
        <input type="radio" name="payment-method" id="stripe" value="stripe"/>
        <label for="stripe">stripe
        </label>
        </div>
        </li>
        <li>
        <button type="submit" class="primary">Continue</button>
        </li>
        
       



        </ul>

        </form>


        </div>
        
        
        
        `
  }
}
export default paymentscreen;