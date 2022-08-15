
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowCircleDown, faL} from '@fortawesome/free-solid-svg-icons'
import "./FeedItem.css"
import useFetch from '../../hooks/useFetch'
import OrdersOverlay from '../../OrdersOverlay/OrdersOverlay'
import { useState } from 'react'


const FeedItem = (props) => {

    //Fetch product
    const{data:product, error:errorProduct} = useFetch("/api/product/" + props.product_id)

    //Fetch product
    const{data:store, error:errorStore} = useFetch("/api/store/" + props.store_id)

    //Open feed item
    const openItem = ()=>{
        console.log("Item engaged!");
    }

    //Date converter
    const dateConverter = (x)=>{
        let dateStr =new Date(x)
        return dateStr.toLocaleDateString()
    }
    
    //Icons
    const inIcon = <FontAwesomeIcon className='icon-body' icon={faArrowCircleDown} />
    const arrowRight = <FontAwesomeIcon className='icon-arrow' onClick={openItem} icon={faAngleRight} />


    //Overlay toggle
    const[isOpen, setIsOpen] = useState(false)

    return (
        <>
            <OrdersOverlay open={isOpen}
                           onClose={()=>setIsOpen(false)}
                           store={store}
                           timestamp= {props.timestamp}
                           dateConverter={dateConverter}
                           quantity={props.quantity}
                           status={props.status}
                           comment={props.comment}
                           orderID={props.orderID}
                           owner={props.owner}
                           product={product}
                           socket={props.socket}></OrdersOverlay>
            
            <div className="feed-item" onClick={()=>{setIsOpen(true)}}>

                <div className='icon-container'>
                    {inIcon}
                </div>
                <div className="info">
                    <div className="item-count font bold">{props.quantity}</div>
                    <div className="date font" >{dateConverter(props.timestamp)}</div>
                </div>
                <div className='feed-text'>
                    <div className="title font bold">{product.productname}</div>
                    <div className="shop-name font">{store.storename}</div>
                </div>
                <div className='feed-status'>
                    <div className={`status-${props.status}`}>{props.status}</div>
                </div>
                <div className='icon-container'>
                    {arrowRight}
                </div>
                
            </div>
        </>

     );
}
 
export default FeedItem;