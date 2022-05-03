import React from "react";
import "./Overlay.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut, faPlusCircle, faPlusSquare, faHome, faCoins, faUsers, faArchive, faDownload} from '@fortawesome/free-solid-svg-icons'

const Overlay = ({visible, toggleHamburger, logout})=>{

    const object = JSON.parse(sessionStorage.getItem('token'))
    console.log(object)

    const logoutIcon = <FontAwesomeIcon className="overlayIcons" icon={faSignOut} />
    const createStoreIcon = <FontAwesomeIcon className="overlayIcons" icon={faPlusSquare} />
    const createInventory = <FontAwesomeIcon className="overlayIcons" icon={faPlusCircle} />
    const inventory = <FontAwesomeIcon className="overlayIcons" icon={faCoins} />
    const staff = <FontAwesomeIcon className="overlayIcons" icon={faUsers} />
    const stores = <FontAwesomeIcon className="overlayIcons" icon={faArchive} />
    const homeIcon = <FontAwesomeIcon className="overlayIcons" icon={faHome} />
    const requestIcon = <FontAwesomeIcon className="overlayIcons" icon={faDownload} />


    return(
         <div className="overlay"
            onClick={toggleHamburger}
            style={visible? {display: "block"}: {display: "none"}}>
                <div className="text">
                    <Link to="/">{homeIcon}  Home</Link>
                    {object.role === "Manager" && <Link to="/getStaff">{requestIcon}  Request</Link>}
                    {object.role === "Admin" && <Link to="/getStaff">{staff}  Staff</Link>}
                    {object.role === "Admin" && <Link to="/getInventory">{inventory} Inventory</Link>}
                    {object.role === "Admin" && <Link to="/getStores">{stores} Stores</Link>}
                    {object.role === "Admin" &&  <Link to="/createStore">{createStoreIcon}  Create Store</Link>}
                    {object.role === "Admin" && <Link to="/createInventory">{createInventory}  Create Inventory</Link>}
                    <Link to="" onClick={logout}>{logoutIcon}  Logout</Link>
                </div>
        </div>
        
    )
}

export default Overlay;