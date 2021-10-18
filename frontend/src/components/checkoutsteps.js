const checkoutsteps = {
    render: (props) => {
        return `
         <div class="check-outstep">
         <div class="${props.step1 ? 'active' : ''}">Signin</div>
         <div class="${props.step2 ? 'active' : ''}">shipping</div>
         <div class="${props.step3 ? 'active' : ''}">Payment</div>
         <div class="${props.step4 ? 'active' : ''}">Place order</div>
         </div>
         `

    },

}
export default checkoutsteps;