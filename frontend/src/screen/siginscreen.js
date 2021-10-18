import { signin } from "../api";
import { getdata, setdata } from "../localstorage";
import { hidloading, redirect, showloading } from "../utils";



const siginscreen = {

  after_render: () => {
    document.getElementById('signin-form').addEventListener('submit', async (e) => {
      e.preventDefault();

      showloading()
      const datas = await signin({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,

      })
      hidloading()

      if (!datas) {

        alert('invalid password or email')



      } else {
        setdata(datas)

        redirect();
      }

    })




  },
  render: () => {
    if (getdata().name) {
      redirect();

    }
    return `
        <div class='form-container'>
        <form id="signin-form">
        <ul class='form-items'>
        <li>
        <h1>
        sign-in
        </h1>
        </li>
        <li>
          <label for="email">Email</label>
          <input type="email" name="email" id="email"/>
        </li>
        <li>
        <label for="password"> password </label>
        
        <input type="password" name="password" id="password"/>
        </li>
        <li>
        <button type="submit" class="primary">signin</button>
        </li>
        <li>
        <div>
        New user?
        <a href="/#/register">create your account </a>
        </div>
        </li>



        </ul>

        </form>


        </div>
        
        
        
        `
  }
}
export default siginscreen;