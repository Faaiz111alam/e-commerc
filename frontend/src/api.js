import axios from "axios";
// import { json } from "body-parser";
// import { application } from "express";
import { apiurl } from "./config";
import { getdata } from "./localstorage";
export const getorderpro = async ({ searchKeyword ='' }) => {
   try {
        let que='?';
        if(searchKeyword) que +=`serchKeyword=${searchKeyword}`;
        const response = await axios({
            url: `${apiurl}/postman/products${que}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }

        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message)

        }
        return response.data
    } catch (err) {
        console.log(err.message)
        // return { error: err.response.data.message || err.message };

    }
}



export const getsummary= async()=>{
    try {
        const {token}= getdata()
        const response = await axios({
            url:`${apiurl}/postman/orders/summary`,
            method:'GET',
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'application/json'
            }
        })
        if (!response) {
            throw new Error(response.data.message)
            
        }else{
            return response.data
        }

    } catch (err) {
        return {error:err.response ? err.response.data.message:err.message}
        
    }
}

export const getproduct = async (id) => {

    try {
        const response = await axios({
            url: `${apiurl}/postman/products/${id}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }

        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message)

        }
        return response.data
    } catch (err) {
        console.log(err.message)
        // return { error: err.response.data.message || err.message };

    }
}
export const createProduct=async()=>{
    try {
        const {token} =getdata();
        const response = await axios({
            url:`${apiurl}/postman/products`,
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        })
        if(!response){
            throw new Error(response.data.message);

        }
        return response.data
        
    } catch (err) {
        console.log(err.message);
        
    }
}
export const deleteProduct =async(id)=>{
    try {
        const {token} =getdata();
        const response = await axios({
            url:`${apiurl}/postman/products/${id}`,
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        })
        if(!response){
            throw new Error(response.data.message);

        }
        return response.data
        
    } catch (err) {
        console.log(err.message);
        
    }
}
export const uploadproimgae= async(formdataa) =>{
    const {token} = getdata()

    try {
        const response = await axios({
            url:`${apiurl}/postman/uploads`,
            method:'POST',
            headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'multipart/form-data',
            },
            data:formdataa,
        })
        if (!response) {
            throw new Error (response.data.message)
            
        }
        return response.data
    } catch (err) {
       console.log(err.message)
        
    }

}
export const updateproduct=async(productcx)=>{
    try {
        const {token} =getdata();
        const response = await axios({
            url:`${apiurl}/postman/products/${productcx._id}`,
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            },
            data:productcx,
            
        })
        if(!response){
            throw new Error(response.data.message);

        }
        return response.data;
        
    } catch (err) {
        console.log(err.message);
        
    }
}
export const signin = async ({ email, password }) => {
    try {
        const response = await axios({
            url: `${apiurl}/postman/userss/signin`,
            method: 'POST',
            header: {
                'Content-Type': 'application.json'
            },
            data: {
                email,
                password,

            }
        }
        )
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message)
        } else {
            return response.data
        }

    } catch (err) {

        console.log(err)
    }
}

export const register = async ({ name, email, password }) => {
    try {
        const response = await axios({
            url: `${apiurl}/postman/userss/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                name,
                email,
                password,

            }
        }
        )
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message)
        } else {
            return response.data
        }

    } catch (err) {

        console.log(err)
    }
}



export const update = async ({ name, email, password }) => {
    try {
        const { _id, token } = getdata();
        const response = await axios({
            url: `${apiurl}/postman/userss/${_id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: {
                name,
                email,
                password,
            },
        });
        if (response.statusText !== 'OK') {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
};

export const createorder = async (order) => {
    try {
        const { token } = getdata();
        const response = await axios({
            url: `${apiurl}/postman/orders`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: order,
        });
        if (response.statusText !== 'Created') {
            throw new Error(response.data.message)

        }
        return response.data;




    } catch (err) {
        return { error: err.response ? err.response.data.message : err.message }

    }

}
// export const getorders = async() => {
    
//     try {
//         const {token} = getdata()
//         const response = await axios({
//             url: `${apiurl}/postman/orders`,
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization:`Bearer ${token}`
//             }

//         });
//         if (response.statusText !== 'OK') {
//             throw new Error(response.data.message)

//         }
//         return response.data
//     } catch (err) {
//         console.log(err)
//         return {error:err.response.data.message||err.message}
//         // return { error: err.response.data.message || err.message };

//     }
// }
export const getorders = async () => {
    try {


        const { token } = getdata();
        const response = await axios({
            url: `${apiurl}/postman/orders`,
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`
            }

        })
        if (!response) {
            throw new Error(error.message)



        } else {
            return response.data;
        }
    } catch (err) {
        return { error: err.message }

    }
}
export const deleteOrder =async(id)=>{
    try {
        const {token} =getdata();
        const response = await axios({
            url:`${apiurl}/postman/orders/${id}`,
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        })
        if(!response){
            throw new Error(response.data.message);

        }
        return response.data
        
    } catch (err) {
        console.log(err.message);
        
    }
}


export const getorder = async (id) => {
    try {


        const { token } = getdata();
        const response = await axios({
            url: `${apiurl}/postman/orders/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }

        })
        if (!response) {
            throw new Error(error.message)



        } else {
            return response.data
        }
    } catch (err) {
        return { error: err.message }

    }
}



export const getpaypalclientid = async () => {
    try {
        const response = await axios({
            url: `${apiurl}/postman/paypal/clientId`,
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (response.statusText !== 'OK') {
            throw new Error(response.data.message)

        } else {
            return response.data.clientId;
        }
    } catch (err) {
        return { error: err.message }

    }

}
export const payorder = async (id, paymentresult) => {
    try {
        const { token } = getdata();

        const response = await axios({
            url: `${apiurl}/postman/orders/${id}/pay`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            order: paymentresult,

        })
        if (response) {
            throw new Error(response.data.message)


        }
        else {
            return response.data;
        }
    } catch (err) {
        return { error: err.response ? err.response.data.message : err.message }

    }
}
export const deliverorder = async (id) => {
    try {
        const { token } = getdata();

        const response = await axios({
            url: `${apiurl}/postman/orders/${id}/deliver`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
           
        })
        if (response) {
            throw new Error(response.data.message)


        }
        else {
            return response.data;
        }
    } catch (err) {
        return { error: err.response ? err.response.data.message : err.message }

    }
}
export const getmyorder = async()=>{

    try {
        
        const {token}= getdata()
        const res = await axios({
            url:`${apiurl}/postman/orders/mine`,
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
    
        })
        if (!res) {
            throw new Error(res.data.message)
            
        }else{
            return res.data;
        }
    } 
    
    catch (err) {
        return {error:err.response ? err.response.data.message:err.message}
        
    }



}



