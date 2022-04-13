import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import "./RequestItem.css"

const RequestItem = (props) => {
    //Icons
    const inIcon = <FontAwesomeIcon className='icon-body icon-color' icon={faDownload} />

    return (
            <div className="feed-item transparent">
                <div className='icon-container'>
                    {inIcon}
                </div>
                <div className='orders-feed-text'>
                    <div className="title font bold">Ivancko Barbell</div>
                    <div className="shop-name font">Wendani GYM</div>
                </div>

                <div className="button-container">
                    <button className='round-button'>+</button>
                    <input type="number"
                           min="1"
                           name=''
                           id=''
                           max="20">
                    </input>
                    <button className='round-button minus'>-</button>
                </div>

                <div className="send-container">
                    <button className='button'>send</button>
                </div>
            
            </div> 
            );
}
 
export default RequestItem;