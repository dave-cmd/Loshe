import "./OrdersOverlay.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"

const OrdersOverlay = ({open, onClose, product, quantity, timestamp, status, dateConverter, store, owner, orderID})=>{

    //Set posting
    const[posting, setPosting] = useState(false)
    const[postingError, setPostingError] = useState(false)

    //Logged in user
    const object = JSON.parse(sessionStorage.getItem('token'))

    //Icon
    const closeIcon = <FontAwesomeIcon className="modal-icon" icon={faClose} onClick={onClose} />

    //Update Order
    const updateOrder = ()=>{
        //Send update based on payload
        const payload = {}
        if(status === 'Pending'){
            payload.status =  'Approved'
        }
        else if(status === 'Approved'){
            payload.status = 'Delivered'
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
        })
        .catch(error=>{
            console.log(error.message)
            setPostingError(true)
        })
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
                    <div className="modal-buttons-section">
                        {object.id === owner && status === "Pending" && <button className="modal-buttons" onClick={updateOrder}>Approve</button>}
                        {object.role === "Manager" && status === "Pending" && <button disabled className="modal-buttons">Awaiting approval..</button>}
                        {/* {object.id === store.user_id && status === "Pending" && <button disabled className="modal-buttons">Awaiting approval..</button>} */}

                        {/* {object.id === store.user_id && status === "Approved" && <button className="modal-buttons" onClick={updateOrder}>Confirm Delivery</button>} */}
                        {object.id === store.owner && status === "Approved" && <button className="modal-buttons">Awaiting delivery...</button>}
                        {object.role === "Manager" && status === "Approved" && <button className="modal-buttons" onClick={updateOrder}>Confirm Delivery</button>}

                        {/* {object.id === store.user_id && status === "Delivered" && <button disabled className="modal-buttons">Delivered</button>} */}
                        {object.role === "Manager" && status === "Delivered" && <button disabled className="modal-buttons">Delivered</button>}
                        {object.id === store.owner && status === "Delivered" && <button disabled className="modal-buttons">Delivered</button>}
                        
                    </div>
    
                </div>
                </>
            )
        }
}

export default OrdersOverlay;
