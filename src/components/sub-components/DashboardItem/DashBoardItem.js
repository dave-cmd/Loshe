import "./DashboardItem.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faExternalLinkSquare, faBatteryQuarter, faStore} from '@fortawesome/free-solid-svg-icons'

const DashBoardItem = (props) => {

    //Icons
    // const storeIcon = <FontAwesomeIcon style={{ color : "white" }} icon={faStore} />
    // const productsInIcon = <FontAwesomeIcon style={{ color : "white", transform: "rotate(180deg)" }} icon={faExternalLinkSquare} />
    // const productsOutIcon = <FontAwesomeIcon style={{ color : "white" }} icon={faExternalLinkSquare} />
    // const almostOutIcon = <FontAwesomeIcon style={{ color : "white" }} icon={faBatteryQuarter} />

    return ( 
        <div className="store-dashItem">
            {/* Icons conditionally rendered */}
            { props.icon === "productsInIcon" && <>
                                                <p className=" font">2400</p>
                                                <p className="font bold">{props.text}</p></>}
            {/* { props.icon === "productsOutIcon" && <>
                                                <p className="font">2400</p>
                                                <p className="font bold">{props.text}</p></>} */}
            { props.icon === "almostOutIcon" && <>
                                                <p className="font">2400</p>
                                                <p className="font bold">{props.text}</p></>}
            { props.icon === "storeIcon" && <>
                                                <p className="font">2400</p>
                                                <p className="font bold">{props.text}</p></>}
        </div>
     );
}
 
export default DashBoardItem;