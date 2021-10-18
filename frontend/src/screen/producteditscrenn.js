import { hidloading, parseRequestUrl, showloading } from '../utils';
import { getproduct, updateproduct, uploadproimgae} from '../api';
const producteditscreen={

after_render:()=>{
    const request =parseRequestUrl()
    document.getElementById('form_edit').addEventListener('submit',async(e)=>{
        e.preventDefault()
        
        const data=await updateproduct({
           _id:request.id,
           name:document.getElementById('name').value,
           price:document.getElementById('price').value,
           image:document.getElementById('image').value,
           countInStock:document.getElementById('countInStock').value,
           brand:document.getElementById('Brand').value,
           category:document.getElementById('category').value,
           description:document.getElementById('description').value,


        })
        if (!data) {
            alert("error in changing the update")
          
            
        }else{
            document.location.hash='/productlist';
        }


    })
    document.getElementById('file-upload').addEventListener('change',async(e)=>{
        e.preventDefault()
        const file=e.target.files[0]
        const formdata = new FormData();
        formdata.append('image',file);
        showloading()
        const data =await uploadproimgae(formdata)
        hidloading()
        if (!data) {
            alert("error")
            
        }else{
            alert('sucss')
            document.getElementById('image').value=data.image;
        }

    })

},
render: async()=>{
    const request = parseRequestUrl();
    
    const productc = await getproduct(request.id)
    return `
    <div class="updatecont">
    <a href="/#/productlist">Back to products </a>

        </div>
        <div class="form_cont">
        <form id="form_edit">
        <ul class="form_item">
        <li>
        <h1>Edit product ${productc._id.substring(0,8)}</h1>
        </li>
        <li>
        <label for="name">Name
        </label>
        <input type="name" name="name" id="name" value="${productc.name}"/>
        </li>
        <li>
        <label for="name">Price
        </label>
        <input type="number" name="price" id="price" value="${productc.price}"/>
        </li>
        <li>
        <label for="Brand">Brand
        </label>
        <input type="Brand" name="Brand" id="Brand" value="${productc.brand}"/>
        </li>
        <li>
        <label for="image">image(680 x 830)
        </label>
        <input type="text" name="image" id="image" value="${productc.image}"/>
        <input type="file" name="file-upload" id="file-upload" />
        </li>
        <li>
        <label for="Countinstock">Count In Stock
        </label>
        <input type="number" name="countInStock" id="countInStock" value="${productc.countInStock}"/>
        </li>
        <li>
        <label for="category"> category
        </label>
        <input type="text" name="category" id="category" value="${productc.category}"/>
        </li>
        <li>
        <label for="description"> description
        </label>
        <input type="description" name="description" id="description" value="${productc.description}"/>
        </li>
        <li>
        <button type="submit">update</button>
        </li>
        </ul>
        </form>
        </div>
    
    `
}

}
export default producteditscreen;
