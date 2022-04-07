import "./Dashboard.css"
import DashBoardItem from "../sub-components/DashboardItem/DashBoardItem";
import FeedItem from "../sub-components/FeedItem/FeedItem"
import useFetch from "../hooks/useFetch"


const Dashboard = ()=>{

    //Fetch orders
    const{data:orders, error} =  useFetch("/api/getOrders")

    //Map over orders
    const feedItems = orders.map(order=>{
        return <FeedItem key={order.id}
                         timestamp={order.timestamp}
                         quantity={order.quantity}
                         store_id={order.store_id}
                         product_id = {order.product_id}/>
    })

    return ( 
        <div className="wrapper-staff-details">
            <div className="name-section">
                <h1 className="staff-title">Admin Dashboard</h1>
            </div>

            <div className="hero-section">
                <DashBoardItem className="store-dashItem" icon={"productsInIcon"} text={"Products"}/>
                <DashBoardItem className="store-dashItem" icon={"almostOutIcon"} text={"Low Stock"}/>
                <DashBoardItem className="store-dashItem" icon={"storeIcon"} text={"Stores"}/>      
            </div>   

            <div className="action-section">Recent Activity</div>

            <div className="feed-section">
                {feedItems}
            </div>

        </div>
     );
};
 
export default Dashboard;