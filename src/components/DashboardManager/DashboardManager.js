import "./DashboardManager.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faAt, faStore, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteOverlay from "../DeleteOverlay/DeleteOverlay";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FeedItem from "../sub-components/FeedItem/FeedItem";
import useFetch from "../hooks/useFetch";


const DashboardManager = () => {
    //Get id from session storage
    const object  = JSON.parse(sessionStorage.getItem("token"))
    
    // const{data, error, isFetching} = useFetch('/api/storeByManager/' + object.id)
    const{data, error, isFetching} = useFetch('/api/getStoreId/' + object.store)

    //Delete error
    const[deleteError, setDeleteError] = useState(false)

    //Instanciate history for redirects
    const history = useHistory();

    //Toggle deleteOverlay visibility
    const [displayDeleteOverlay, setDisplayDeleteOverlay] = useState(false)

     //Fetch product count
    //  const{data:products, error:errorProductCount} = useFetch("/api/getStoreProducts/" + data.id)
    const{data:products, error:errorProductCount} = useFetch("/api/getStoreProducts/" + object.store)

     //Implement reduce later TODO
     let productCount = 0
     products.forEach(item=>productCount += item.quantity)

    //Fetch store products almost out
    const {data:storeProductsAlmostOut, error: errorStoreProductsAmostOut} = useFetch('/api/getStoreProductsAlmostOut/' + data.id)

    let storeProductsAlmostOutCount = 0
    storeProductsAlmostOut.forEach(item=>{ return storeProductsAlmostOutCount += 1})


     //Fetch store sales
     const{data:sales, error:errorSales} = useFetch("/api/getStoreSales/" +  data.id)

     let storeSalesCount = 0
     sales.forEach(item=> { return storeSalesCount += 1})

     //Fetch store orders
     const{data:orders, error:errorOrders} = useFetch("/api/getStoreOrders/" +  data.id)

    //Map over store orders
     const feedItems = orders.map(order=>{
        return <FeedItem key={order.id}
                         timestamp={order.timestamp}
                         quantity={order.quantity}
                         status={order.status}
                         store_id={order.store_id}
                         orderID={order.id}
                         product_id = {order.product_id}/>
                         })


    //Icons
    const storeIcon = <FontAwesomeIcon className="profileIcon" icon={faStore} />
    const emailIcon = <FontAwesomeIcon className="emailIcon" icon={faAt} />
    const phoneIcon = <FontAwesomeIcon className="phoneIcon" icon={faPhone} />
    const requestIcon = <FontAwesomeIcon className="requestIcon" icon={faPlusCircle} />

    //Fetch from roles table
    const {data:manager, error: errorRole} = useFetch('/api/staff/' + object.id)
  
    //Activate delete overlay
    const activateDeleteOverlay = ()=>{
        setDisplayDeleteOverlay(!displayDeleteOverlay)
        console.log("deleteOverlay activated!!!")
    }

    //Delete staff
    const deleteStaff = (id) =>{
        fetch("/api/deleteStore/" + id, {
            method: 'DELETE',
        })
        .then(res=>{
            if(!res.ok){
                throw Error("Error deleting store member.");
            }
            return res.json()
        })
        .then(data=>{
            // console.log(data);
            setDisplayDeleteOverlay(false);
            history.push("/getStores")
        })
        .catch(e=>{
            setDeleteError(e.message)
            console.log(e.message)
        })
    }

    //Redirect to request
    const redirectToRequest = ()=>{
        history.push("/request/");
    }

    //Redirect to sales
    const redirectToSale = ()=>{
        history.push("/sale/");
    }

    //Redirect to Store products
    const redirectToProducts = ()=>{
        history.push("/getStoreInventory/" + object.store)
    }
    return ( 
        
        <div className="wrapper-staff-details">
            {/* <DeleteOverlay display={displayDeleteOverlay}              
                           setDisplay= {setDisplayDeleteOverlay}
                           id={id}
                           deleteStaff={deleteStaff}
                           deleteError={deleteError}
                           setDeleteError={setDeleteError}/> */}
            { data.length === 0 && error === null  && <div className="status">Fetching resource...</div>}
            { isFetching=== false && Object.keys(data).length > 0 && error === null && 
                (<>
                    <div className="name-section">
                        {storeIcon}
                        <div>{data.storename}</div>
                        <div className="bold">{data.region}</div>
                    </div>

                    <div className="hero-section">
                        <div className="store-dashItem" onClick={redirectToProducts}>
                            <div className="font bold">Products</div>
                            <div className="font">{productCount}</div>
                        </div>
                        <div className="store-dashItem">
                            <div className="font bold">Low Stock</div>
                            <div className="font">{storeProductsAlmostOutCount}</div>
                        </div>
                        <div className="store-dashItem">
                            <div className=" font bold">Sold</div>
                            <div className="font">{storeSalesCount}</div>
                        </div>
                    </div>

                    <div className="feed-section">
                        {orders.length === 0 && <div className="orders-font">Orders currenly unavailable</div>}
                        {feedItems}
                    </div>
                    <div className="contact-section">
                        <div className="phone-details">
                            {phoneIcon}
                            <div className="phone-subsection">
                                <div className="font bold">PHONE</div>
                                <a href={`tel://${manager.phone}`}>{manager.phone}</a>
                                {/* <div className="font">{manager.phone}</div> */}
                            </div>
                        </div>
                        <div className="email-details">
                            {emailIcon}
                            <div className="email-subsection">
                                <div className="font bold">EMAIL</div>
                                <div className="font">{manager.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className="store-section">
                        <div className="font bold">Manager:</div>
                        <div className="font">{manager.firstname} {manager.lastname}</div>
                    </div>
                    <div className="action-section">
                        {/* <div className="action update" onClick={redirectToUpdate}>Update</div>
                        <div className="action delete" onClick={()=>{activateDeleteOverlay();}}>Delete</div> */}
                        <div className="action update" onClick={()=>{redirectToRequest()}}>Request</div>
                        <div className="action update" onClick={()=>{redirectToSale()}}>Sell</div>
                    </div>
                </>)
            }
            { error !== null && <div className="status error">{error}</div>}
        </div>
     );
}
 
export default DashboardManager;