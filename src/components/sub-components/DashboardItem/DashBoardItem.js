import "./DashboardItem.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquare, faBatteryQuarter, faStore} from '@fortawesome/free-solid-svg-icons'

const DashBoardItem = (props) => {

    //Icons
    const storeIcon = <FontAwesomeIcon style={{ color : "white" }} icon={faStore} />
    const productsInIcon = <FontAwesomeIcon style={{ color : "white", transform: "rotate(180deg)" }} icon={faExternalLinkSquare} />
    const productsOutIcon = <FontAwesomeIcon style={{ color : "white" }} icon={faExternalLinkSquare} />
    const almostOutIcon = <FontAwesomeIcon style={{ color : "white" }} icon={faBatteryQuarter} />

    return ( 
        <div className="item-wrapper">
            {/* Icons conditionally rendered */}
            { props.icon === "productsInIcon" && <>{productsInIcon}
                                                <p className="quantity bold">2400</p>
                                                <p className="product">{props.text}</p></>}
            { props.icon === "productsOutIcon" && <>{productsOutIcon}
                                                <p className="quantity bold">2400</p>
                                                <p className="product">{props.text}</p></>}
            { props.icon === "almostOutIcon" && <>{almostOutIcon}
                                                <p className="quantity bold">2400</p>
                                                <p className="product">{props.text}</p></>}
            { props.icon === "storeIcon" && <>{storeIcon}
                                                <p className="quantity bold">2400</p>
                                                <p className="product">{props.text}</p></>}
        </div>
     );
}
 
export default DashBoardItem;