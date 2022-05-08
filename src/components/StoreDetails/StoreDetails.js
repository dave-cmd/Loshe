import "./StoreDetails.css"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faAt, faStore, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteOverlay from "../DeleteOverlay/DeleteOverlay";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FeedItem from "../sub-components/FeedItem/FeedItem";
import useFetch from "../hooks/useFetch";


const StoreDetails = () => {
    //Get id from parameter
    const {id} = useParams();

    // const{data, error, isFetching} = useFetch('/api/store/' + id)
    const{data, error, isFetching} = useFetch('/api/getStoreId/' + id)

    //Delete error
    const[deleteError, setDeleteError] = useState(false)

    //Instanciate history for redirects
    const history = useHistory();

    //Toggle deleteOverlay visibility
    const [displayDeleteOverlay, setDisplayDeleteOverlay] = useState(false)

    //Fetch Store Orders
     const{data:orders, error:errorOrders} = useFetch("/api/getStoreOrders/" + id)

    //Map over orders
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
    const storeIcon = <FontAwesomeIcon className="profileIcon color" icon={faStore} />
    const emailIcon = <FontAwesomeIcon className="phoneIcon color" icon={faAt} />
    const phoneIcon = <FontAwesomeIcon className="phoneIcon color" icon={faPhone} />
    const contactIcon = <FontAwesomeIcon className="phoneIcon color" icon={faUser} />
    const requestIcon = <FontAwesomeIcon className="requestIcon color" icon={faPlusCircle} />

    //Fetch manager role
    // const {data:manager, error: errorRole} = useFetch('/api/staff/' + data.user_id)

    //Fetch store products
    const {data:storeProducts, error: errorStoreProducts} = useFetch('/api/getStoreProducts/' + id)

    let storeProductCount = 0

    storeProducts.forEach(item=>{return storeProductCount += item.quantity})

    //Fetch store products almost out
    const {data:storeProductsAlmostOut, error: errorStoreProductsAmostOut} = useFetch('/api/getStoreProductsAlmostOut/' + id)

    let storeProductsAlmostOutCount = 0

    storeProductsAlmostOut.forEach(item=>{ return storeProductsAlmostOutCount += 1})

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
                throw Error("Error deleting store memeber.");
            }
            return res.json()
        })
        .then(data=>{
            setDisplayDeleteOverlay(false);
            history.push("/getStores")
        })
        .catch(e=>{
            setDeleteError(e.message)
            console.log(e.message)
        })
    }

    //Redirect to update
    const redirectToUpdate = ()=>{
        history.push("/updateStoreDetails/" + id);
    }

    //Redirect to request
    const redirectToRequest = ()=>{
        history.push("/request/");
    }

    //Redirect to Store products
    const redirectToProducts = ()=>{
        history.push("/getStoreInventory/" + id)
    }

    return ( 
        
        <div className="wrapper-staff-details">
            <DeleteOverlay display={displayDeleteOverlay}              
                           setDisplay= {setDisplayDeleteOverlay}
                           id={id}
                           deleteStaff={deleteStaff}
                           deleteError={deleteError}
                           setDeleteError={setDeleteError}/>
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
                            <div className="font">{storeProductCount}</div>
                        </div>
                        <div className="store-dashItem">
                            <div className="font bold">Low Stock</div>
                            <div className="font">{storeProductsAlmostOutCount}</div>
                        </div>
                        <div className="store-dashItem">
                            <div className=" font bold">Sold</div>
                            <div className="font">--</div>
                        </div>
                    </div>

                    <div className="feed-section">
                        {orders.length === 0 && <div className="orders-font">Orders currently unavailable.</div>}
                        {feedItems}
                    </div>
                    <div className="contact-section-rl">
                        {Array.isArray(data.users) && data.users.map(elem=>{
                           return <div className="contact-entity">
                                    <div className="phone-details">
                                        {contactIcon}
                                        <div className="phone-subsection">
                                            <div className="font bold color">MANAGER</div>
                                            <div className="font">{elem.lastname}</div>
                                        </div>
                                    </div>
                                    <div className="phone-details">
                                        {phoneIcon}
                                        <div className="phone-subsection">
                                            <div className="font bold color">PHONE</div>
                                            <div className="font color"><a href={`tel://${elem.phone}`}>{elem.phone}</a></div>
                                        </div>
                                    </div>
                                    <div className="phone-details">
                                        {emailIcon}
                                        <div className="phone-subsection">
                                            <div className="font bold color">EMAIL</div>
                                            <div className="font color">{elem.email}</div>
                                        </div>
                                    </div>
                                  </div>
                
                        })}
                        {!Array.isArray(data.users) &&  <div>
                                                                <div className="phone-details">
                                                                    {phoneIcon}
                                                                    <div className="phone-subsection">
                                                                        <div className="font bold color">PHONE</div>
                                                                        <div className="font color"><a href={`tel://${data.users.phone}`}>{data.users.phone}</a></div>
                                                                    </div>
                                                                </div>
                                                                <div className="email-details">
                                                                    {emailIcon}
                                                                    <div className="email-subsection">
                                                                        <div className="font bold color">EMAIL</div>
                                                                        <div className="font color">{data.users.email}</div>
                                                                    </div>
                                                                </div>
                                                            </div>}

                    </div>
                    <div className="store-section">
                        <div className="font bold color">Manager(s):</div>
                        {Array.isArray(data.users) && data.users.map(elem=>{
                            return <div className="font">{elem.firstname} {elem.lastname}</div>
                        })}
                        {!Array.isArray(data.users) && <div className="font">{data.users.firstname} {data.users.lastname}</div>}
                    </div>
                    <div className="action-section">
                        <div className="action update" onClick={redirectToUpdate}>Update</div>
                        <div className="action delete" onClick={()=>{activateDeleteOverlay();}}>Delete</div>
                        {/* <div className="action delete" onClick={()=>{redirectToRequest()}}>Request</div> */}
                    </div>
                </>)
            }
            { error !== null && <div className="status error">{error}</div>}
        </div>
     );
}
 
export default StoreDetails;