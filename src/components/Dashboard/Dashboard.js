import "./Dashboard.css"
import DashBoardItem from "../sub-components/DashboardItem/DashBoardItem";
import FeedItem from "../sub-components/FeedItem/FeedItem"
import useFetch from "../hooks/useFetch"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import StoreDetails from "../StoreDetails/StoreDetails";
import DashboardManager from "../DashboardManager/DashboardManager";


const Dashboard = ({isAuthorized, userID})=>{

    //Initialize useHistory
    const history = useHistory()

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

    //Navigate to stores
    const goToStores = ()=>{
        history.push("/getStaff")
    }

    //Navigate to products
    const goToProducts = ()=>{
        history.push("/getInventory")
    }


    return ( 
        <>
        {isAuthorized !== "Admin" && <DashboardManager userID={userID} />}
        {isAuthorized === "Admin" && <div className="wrapper-staff-details">
            <div className="name-section">
                <h1 className="staff-title">Admin Dashboard</h1>
            </div>

            <div className="hero-section">
                <DashBoardItem className="store-dashItem" text={"Products"} click={goToProducts}/>
                <DashBoardItem className="store-dashItem" text={"Low Stock"}/>
                <DashBoardItem className="store-dashItem" text={"Stores"} click={goToStores}/>      
            </div>   

            <div className="action-section">Recent Activity</div>

            <div className="feed-section">
                {feedItems}
            </div>

        </div>}
        </>

     );
};
 
export default Dashboard;