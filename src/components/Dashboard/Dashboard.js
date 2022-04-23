import "./Dashboard.css"
import DashBoardItem from "../sub-components/DashboardItem/DashBoardItem";
import FeedItem from "../sub-components/FeedItem/FeedItem"
import useFetch from "../hooks/useFetch"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DashboardManager from "../DashboardManager/DashboardManager";


const Dashboard = ({isAuthorized, userID})=>{

    //Get id from session storage
    const object  = JSON.parse(sessionStorage.getItem("token"))

    //Initialize useHistory
    const history = useHistory()

    //Fetch orders
    const{data:orders, error} =  useFetch("/api/getOrdersAdmin/" + object.id)

    //Map over orders
    const feedItems = orders.map(order=>{
        return (
                <FeedItem key={order.id}
                                timestamp={order.timestamp}
                                quantity={order.quantity}
                                store_id={order.store_id}
                                product_id = {order.product_id}
                />)
    })

    //Fetch products
    const{data:products, productsError} =  useFetch("/api/getProductsAdmin/" + object.id)

    //Iterate over products
    let products_count = 0

    products.forEach(p =>products_count += p.quantity)

    //Fetch stores
    const{data:stores, storesError} =  useFetch("/api/getStoresAdmin/" + object.id)

    //Get length of the stores array
    let stores_count = stores.length

    //Fetch products that are almost out
    const{data:almostOut, error:AlmostOutOrders} = useFetch("/api/getProductsAlmostOut/"+ object.id)

    //Iterate over products
    let almostOut_count = 0

    almostOut_count = almostOut.length

    //Navigate to stores
    const goToStores = ()=>{
        history.push("/getStores")
    }

    //Navigate to products
    const goToProducts = ()=>{
        history.push("/getInventory")
    }

    //Navigate to almost out products
    const goToAlmostOut = ()=>{
        history.push("/inventoryAlmostOut")
    }



    return ( 
        <>
        {object.role !== "Admin" && <DashboardManager userID={userID} />}
        {object.role === "Admin" && <div className="wrapper-staff-details">
            <div className="name-section">
                <h1 className="staff-title">Admin Dashboard</h1>
            </div>

            <div className="hero-section">
                <DashBoardItem className="store-dashItem" text={"Products"} click={goToProducts} counter={products_count}/>
                <DashBoardItem className="store-dashItem" text={"Low Stock"} click={goToAlmostOut} counter={almostOut_count} />
                <DashBoardItem className="store-dashItem" text={"Stores"} click={goToStores} counter={stores_count} />      
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