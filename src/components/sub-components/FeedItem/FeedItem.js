
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowCircleDown} from '@fortawesome/free-solid-svg-icons'
import "./FeedItem.css"

const FeedItem = () => {

    const openItem = ()=>{
        console.log("Item engaged!");
    }
    const inIcon = <FontAwesomeIcon className='icon-body' icon={faArrowCircleDown} />
    const arrowRight = <FontAwesomeIcon className='icon-arrow' onClick={openItem} icon={faAngleRight} />

    return ( 
        <div className="feed-item">
            {inIcon}
            <div className='info'>
                <p className="item-count">700</p>
                <p className="date">2-3-2022</p>
            </div>
            <p className="title">Masks</p>
            <p className="shop-name">Loshe - Kawangrare</p>
            {arrowRight}
        </div>
     );
}
 
export default FeedItem;