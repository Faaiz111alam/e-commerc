import { getcartitems } from "./localstorage";

export const parseRequestUrl = () => {
    const address= document.location.hash.slice(1).split('?')[0];
    const query=document.location.hash.slice(1).split('?').length===2
    ? document.location.hash.slice(1).split('?')[1]:'';

    const url = address.toLowerCase() || '/';
    const r = url.split('/');
    const q =query.split('=');
    return {
        resource: r[1],
        id: r[2],
        verb: r[3],
        value:q[1]
    }
};

export const rerender = async (component) => {
    document.getElementById('main-container').innerHTML = await component.render();
    if (component.after_render) await component.after_render();
}

export const showloading = (() => {

    document.getElementById('loading-overlay').classList.add('active')
})
export const hidloading = (() => {

    document.getElementById('loading-overlay').classList.remove('active')
})


export const redirect = (() => {
    if (getcartitems().length !== 0) {
        document.location.hash = '/shipping'

    } else {
        document.location.hash = '/'

    }

})

