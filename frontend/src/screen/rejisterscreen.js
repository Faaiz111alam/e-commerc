import { register } from "../api";
import { getdata, setdata } from "../localstorage";
import { hidloading, redirect, showloading } from "../utils";



const registerscreen = {

    after_render: () => {
        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();

            showloading()
            const datas = await register({
                name: document.getElementById('name').value,
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
        <form id="register-form">
        <ul class='form-items'>
        <li>
        <h1>
        Create-account
        </h1>
        </li>
        <li>
          <label for="email">Name</label>
          <input type="name" name="name" id="name"/>
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
        <label for="repassword"> re-enter password </label>
        
        <input type="password" name="repassword" id="repassword"/>
        </li>
        <li>
        <button type="submit" class="primary">register</button>
        </li>
        <li>
        <div>
        Already have account?
        <a href="/#/signin">signin </a>
        </div>
        </li>



        </ul>

        </form>


        </div>
        
        
        
        `
    }
}
export default registerscreen;