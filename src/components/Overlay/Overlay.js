import React from "react";
import "./Overlay.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut, faPlusCircle, faPlusSquare, faHome, faCoins, faUsers} from '@fortawesome/free-solid-svg-icons'

const Overlay = ({visible, toggleHamburger, logout})=>{

    const logoutIcon = <FontAwesomeIcon className="overlayIcons" icon={faSignOut} />
    const createStoreIcon = <FontAwesomeIcon className="overlayIcons" icon={faPlusSquare} />
    const createInventory = <FontAwesomeIcon className="overlayIcons" icon={faPlusCircle} />
    const inventory = <FontAwesomeIcon className="overlayIcons" icon={faCoins} />
    const staff = <FontAwesomeIcon className="overlayIcons" icon={faUsers} />
    const homeIcon = <FontAwesomeIcon className="overlayIcons" icon={faHome} />

    return(
         <div className="overlay"
            onClick={toggleHamburger}
            style={visible? {display: "block"}: {display: "none"}}>
                <div className="text">
                    <Link to="/">{homeIcon}  Home</Link>
                    <Link to="/createStore">{createStoreIcon}  Create Store</Link>
                    <Link to="/createInventory">{createInventory}  Create Inventory</Link>
                    <Link to="/getStaff">{staff}  Staff</Link>
                    <Link to="/getInventory">{inventory} Inventory</Link>
                    <Link to="" onClick={logout}>{logoutIcon}  Logout</Link>
                </div>
        </div>
        
    )
}

export default Overlay;