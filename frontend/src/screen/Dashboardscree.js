import Chartist from 'chartist';
import { getsummary } from "../api";
import dashboardmenu from "../components/dashboardmenu";

const dashboard={
    after_render:async()=>{
        const summ = await getsummary()
        // console.log(summ)
        new Chartist.Line('.ct-chart-line',{
            labels:summ.dailyorders.map((x)=>x._id),
            series:[summ.dailyorders.map((x)=>x.sales)]
        },{
            showArea:true,
        })
        new Chartist.Pie('.ct-chart-pie',{
            labels:summ.productchart.map((x)=>x._id),
            series:summ. productchart.map((x)=>x.count)
        },{
            // donut:true,
            // donutWidth:60,
            // startAngle:70,
            // showlable:true,
            // donutSolid:true
        })
          
  
      },
    render:async()=>{
        let summary =await getsummary()
        return  `
        <div class="dashboard">
        ${dashboardmenu.render({selected:'dashboard'})}
        <div class="dashboard-content">
        <h1> Dashboard</h1>   
        <ul class="summary">
        <li>
        <div class="summary-title">
        <span><i class="fa fa-users"></i>users</span>
        <div class="sum-body">${summary.users[0].numUsers}</div>
        </div>
        </li>
        <li>
        <div class="summary-title">
        <span><i class="fa fa-users"></i>Orders</span>
        <div class="sum-body">${summary.orders[0].numOrders}</div>
        </div>
        </li>
        <li>
        <div class="summary-title">
        <span><i class="fa fa-users"></i>Sales</span>
        <div class="sum-body">${summary.orders[0].numSales}</div>
        </div>
        </li>
        </ul>
        <div class="charts">
            <div class="stt">
                <h3>Sales</h3>
                <div class="ct-perfect-fourth ct-chart-line"></div>
            </div>
            <div class="stt">
                <h3>Catogeries</h3>
                <div class="ct-perfect-fourth ct-chart-pie"></div>
            </div>
        </div>

        <div>

         
     </div>
        
        `


    },
  
}
export default dashboard;