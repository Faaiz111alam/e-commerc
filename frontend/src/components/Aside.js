export const Aside ={
    render:async ()=>{
        return `
        <div class="sidebar">
        <div> SHOP BY CATOGERY </div>
        <button class="close-aside" id="close-aside">x</div>
        </div>
        <div class="aside-body">
        <ul class="catoger">
        <li>
        <a href="/#/?=shirt">shirts
        <span><i class="fa fa-chevron-right"></i></span>
        </a>
        </li>
        <li>
        <a href="/#/?=pant">pants
        <span><i class="fa fa-chevron-right"></i></span>
        </a>
        </li>
        </ul>
        </div>
        `

    },
    after_render:async()=>{
        document.getElementById('aside-co').classList.remove('open')
      document.getElementById('close-aside').addEventListener('click',async()=>{
      document.getElementById('aside-co').classList.remove('open')
          
        })
    }

}