import "./OrdersOverlay.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

const OrdersOverlay = ({open, onClose, product, quantity, timestamp, status, comment, dateConverter, store, owner, orderID, socket})=>{

    //Set posting
    const[posting, setPosting] = useState(false)
    const[postingError, setPostingError] = useState(false)

    //Form data
    const[overlayForm, setOverlayForm] = useState({
        "declineComment": "",
    })

    //Logged in user
    const object = JSON.parse(sessionStorage.getItem('token'))

    //Icon
    const closeIcon = <FontAwesomeIcon className="modal-icon" icon={faClose} onClick={onClose} />

    //Update Order
    const updateOrder = ()=>{
        //Send update based on payload
        let payload = {}
        if(status === 'Pending'){
            payload.status =  'Approved'
        }
        else if(status === 'Approved'){
            payload.status = 'Delivered'
        }

        payload = {...payload, ...{"declineComment": "None"}}

        fetch("/api/updateOrder/" + orderID, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then(res=>{
            if(!res.ok){
                throw Error("An error occured in updating the order...")
            }
            return res.json()
        })
        .then(data=>{
            onClose()
            setPosting(false)
            
            if( object.role === 'Admin') {
                // Send notification to server [Admin User]
                socket.emit("sendNotification",{
                    "senderName": object.id,
                    "receiverName": store.users,
                    "orderStatus": payload,
                    "storename": store.storename,
                    "datetime": new Date().toLocaleString()
                });
            }
            
            else {
                // Send notification to server [Manager User]
                socket.emit("sendNotification",{
                    "senderName": object.id,
                    "receiverName": object.owner,
                    "orderStatus": payload,
                    "storename": store.storename,
                    "datetime": Date().toLocaleString()
                });
            }
    
        })
        .catch(error=>{
            console.log(error.message)
            setPostingError(true)


        })
    }

    //Decline order
    const declineOrder = (event)=>{

        event.preventDefault()
        //Send update based on payload
        let payload = {}

        if(status === 'Pending'){
            payload.status =  'Declined'
            payload = {...payload, ...overlayForm}
            
        }

        fetch("/api/updateOrder/" + orderID, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then(res=>{
            if(!res.ok){
                throw Error("An error occured in updating the order...")
            }
            return res.json()
        })
        .then(data=>{
            onClose()
            setPosting(false)
            setOverlayForm("")

            if( object.role === 'Admin') {
                // Send notification to server [Admin User]
                socket.emit("sendNotification",{
                    "senderName": object.id,
                    "receiverName": store.users,
                    "orderStatus": payload,
                    "storename": store.storename,
                    "datetime": new Date().toLocaleString()
                });
            }

            else {
                // Send notification to server [Manager User]
                socket.emit("sendNotification",{
                    "senderName": object.id,
                    "receiverName": object.owner,
                    "orderStatus": payload,
                    "storename": store.storename,
                    "datetime": new Date().toLocaleString()
                });
            }
    
        })
        .catch(error=>{
            console.log(error.message)
            setPostingError(true)
        })
    }

    //Changehandler
    const changeHandler = (event)=>{
        const name  = event.target.name
        const value = event.target.value
        setOverlayForm({...overlayForm, [name]:value})
    }
   
    if (!open) return null

    else {
            return (
                <>
                <div className="overlayOrder"></div>
                <div className="modal">
                    {closeIcon}
                    <div className="modal-title">{product.productname}</div>
                    <div className="order-details font ">
                        <div className="bold visual">OrderID:</div>
                        <div>{orderID}</div>
                    </div>
                    <div className="order-details font">
                        <div className="bold visual">Quantity:</div>
                        <div>{quantity}</div>
                    </div>
                    <div className="order-details font">
                        <div className="bold visual">Date:</div>
                        <div>{dateConverter(timestamp)}</div>
                    </div>
                    <div className="order-details font">
                        <div className="bold visual">Store:</div>
                        <div>{store.storename}</div>
                    </div>
                    <div className="order-details font">
                        <div className="bold visual">Status:</div>
                        <div>{status}</div>
                    </div>

                    {comment && <div className="order-details font">
                        <div className="bold visual">Comment:</div>
                        <div>{comment}</div>
                    </div>}

                    {object.id === owner && status === "Pending" && 
                    <form id="ovelayFormID">
                        <div className="input-wrapper">
                            <label htmlFor="decline_comment">Decline reason</label>
                            <input type="text"
                                className="login-inputs" 
                                onChange={changeHandler}
                                name="declineComment"
                                value={overlayForm.declineComment}/>
                        </div>
                        
                    </form>
                    }


                    <div className="modal-buttons-section">
                        {object.id === owner && status === "Pending" && <div className="appove-decline-buttons">
                                <button className="modal-buttons" onClick={updateOrder}>Approve</button>
                                <button className="modal-buttons decline" onClick={declineOrder} type="submit"  form="ovelayFormID">Decline</button>
                            </div>}
                        {object.role === "Manager" && status === "Pending" && <button disabled className="modal-buttons">Awaiting approval..</button>}
                        {/* {object.id === store.user_id && status === "Pending" && <button disabled className="modal-buttons">Awaiting approval..</button>} */}

                        {/* {object.id === store.user_id && status === "Approved" && <button className="modal-buttons" onClick={updateOrder}>Confirm Delivery</button>} */}
                        {object.id === store.owner && status === "Approved" && <button className="modal-buttons">Awaiting delivery...</button>}
                        {object.role === "Manager" && status === "Approved" && <button className="modal-buttons" onClick={updateOrder}>Confirm Delivery</button>}

                        {/* {object.id === store.user_id && status === "Delivered" && <button disabled className="modal-buttons">Delivered</button>} */}
                        {object.role === "Manager" && status === "Delivered" && <button disabled className="modal-buttons">Delivered</button>}
                        {object.id === store.owner && status === "Delivered" && <button disabled className="modal-buttons">Delivered</button>}

                        {/* {object.id === store.user_id && status === "Delivered" && <button disabled className="modal-buttons">Delivered</button>} */}
                        {object.role === "Manager" && status === "Declined" && <button disabled className="modal-buttons">Declined</button>}
                        {object.id === store.owner && status === "Declined" && <button disabled className="modal-buttons">Declined</button>}
                        
                    </div>
    
                </div>
                </>
            )
        }
}

export default OrdersOverlay;
