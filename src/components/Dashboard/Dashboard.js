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
        <div className="wrapper-dashboard">
            <div className="top-section">
                <h1 className="admin-dash-title">Admin Dashboard</h1>
                <div className="menu-items">
                    <DashBoardItem icon={"productsInIcon"} text={"Products"}/>
                    <DashBoardItem icon={"productsOutIcon"} text ={"In Hand"}/>
                    <DashBoardItem icon={"almostOutIcon"} text={"Low Stock"}/>
                    <DashBoardItem icon={"storeIcon"} text={"Stores"}/>      
                </div>   
            </div>
            <div className="recent-activity">
                <p className="recent-activity-title">Recent Activity</p>
                <div className="feed">
                    {feedItems}
                </div>
            </div>
        </div>
     );
};
 
export default Dashboard;