import "./DashboardItem.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkSquare, faBatteryQuarter, faStore} from '@fortawesome/free-solid-svg-icons'

const DashBoardItem = (props) => {

    //Icons
    const storeIcon = <FontAwesomeIcon style={{ color : "white" }} icon={faStore} />
    const productsInIcon = <FontAwesomeIcon style={{ color : "white", transform: "rotate(180deg)" }} icon={faExternalLinkSquare} />
    const productsOutIcon = <FontAwesomeIcon style={{ color : "white" }} icon={faExternalLinkSquare} />
    const almostOutIcon = <FontAwesomeIcon style={{ color : "red" }} icon={faBatteryQuarter} />
    console.log(props.icon);
    return ( 
        <div className="item-wrapper">
            {/* Icons conditionally rendered */}
            { props.icon === "productsInIcon" && productsInIcon}
            { props.icon === "productsOutIcon" && productsOutIcon}
            { props.icon === "almostOutIcon" && almostOutIcon}
            { props.icon === "storeIcon" && storeIcon}
            <p className="quantity">2400</p>
            <p className="product">Product In</p>
        </div>
     );
}
 
export default DashBoardItem;