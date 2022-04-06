
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowCircleDown} from '@fortawesome/free-solid-svg-icons'
import "./FeedItem.css"
import useFetch from '../../hooks/useFetch'

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

    return ( 
        <div className="feed-item">
            {inIcon}
            <div className='info'>
                <p className="item-count">{props.quantity}</p>
                <p className="date">{dateConverter(props.timestamp)}</p>
            </div>
            <p className="title">{product.productname}</p>
            <p className="shop-name">{store.storename}</p>
            {arrowRight}
        </div>
     );
}
 
export default FeedItem;