import { Aside } from './components/Aside.js';
import headers from './components/headers.js';
import cartscreen from './screen/cartscreen.js';
import dashboard from './screen/Dashboardscree.js';
import Error404screen from './screen/Error404screen.js';
import HomeScreen from './screen/HomeScreen.js';
import { orderlist } from './screen/orderlistscreen.js';
import orderscreen from './screen/orderscreen.js';
import paymentscreen from './screen/paymentscreen.js';
import placeorderscreen from './screen/placeorderscreen.js';
import ProductScreen from './screen/product.js';
import producteditscreen from './screen/producteditscrenn.js';
import { productlist } from './screen/productlistscreen.js';
import profilescreen from './screen/profilescreen.js';
import registerscreen from './screen/rejisterscreen.js';
import shippingscreen from './screen/shippingscreen.js';
import siginscreen from './screen/siginscreen.js';
import { parseRequestUrl } from './utils.js';


const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/order/:id': orderscreen,
    '/cart/:id': cartscreen,
    '/cart': cartscreen,
    '/signin': siginscreen,
    '/register': registerscreen,
    '/profile': profilescreen,
    '/shipping': shippingscreen,
    '/payment': paymentscreen,
    '/placeorder': placeorderscreen,
    '/dashboard':dashboard,
    '/productlist':productlist,
    '/product/:id/edits':producteditscreen,
    '/orderlist':orderlist,






}
const router = async () => {
    const request = parseRequestUrl();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404screen;
    const header = document.getElementById('head')
    header.innerHTML = await headers.render();
    header.after_render = await headers.after_render();
    const aside =document.getElementById('aside-co')
    aside.innerHTML=await Aside.render();
    await Aside.after_render();
    const main = document.getElementById('main-container')
    main.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();




};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);