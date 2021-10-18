


export const getcartitems = () => {
    const cartitems = localStorage.getItem('cartitems') ?
        JSON.parse(localStorage.getItem('cartitems')) : []
    return cartitems;
};

export const setcartitem = (cartitems) => {
    localStorage.setItem('cartitems', JSON.stringify(cartitems));


}

export const setdata = (datas) => {
    localStorage.setItem('userinf', JSON.stringify(datas));

}

export const clearstorage = () => {
    localStorage.removeItem('userinf')

}

export const getdata = () => {
    const getdatas = localStorage.getItem('userinf') ?
        JSON.parse(localStorage.getItem('userinf')) : { name: '', email: '', password: '' }
    return getdatas;

}

export const getshipping = (() => {
    const shipping = localStorage.getItem('shipping') ?
        JSON.parse(localStorage.getItem('shipping')) :
        {
            address: '',
            city: '',
            postalcode: '',
            country: '',



        }
    return shipping;
})
export const setshipping = ({
    address = '',
    city = '',
    postalcode = '',
    country = '',
}) => {
    localStorage.setItem('shipping', JSON.stringify({ address, postalcode, city, country }))
}



export const getpayment = (() => {
    const shipping = localStorage.getItem('payment') ?
        JSON.parse(localStorage.getItem('payment')) :
        {
            paymentMethod: 'paypal',


        }
    return shipping;
})
export const setpayment = ({ paymentMethod = 'paypal' }) => {
    localStorage.setItem('payment', JSON.stringify({ paymentMethod }))
}


export const clencart = (() => {
    localStorage.removeItem('cartitems')

})
