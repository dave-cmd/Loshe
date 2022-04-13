
import "./Navigation.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({setToken, toggleHamburger, logout, isAuthorized}) => {

    return ( 
        <div className="navigation-wrapper">
            <h1 className="nav-title"></h1>
            <ul className="links">
                {/* <li><a href="/">Home</a></li> */}
                <Link to="/">Home</Link>
                <p>|</p>
                { isAuthorized === "Admin" && <Link to="/createStore">Create Store</Link>}
                { isAuthorized === "Admin" && <p>|</p>}
                { isAuthorized === "Admin" && <Link to="/createInventory">Create Inventory</Link>}
                { isAuthorized === "Admin" && <p>|</p>}
                { isAuthorized === "Admin" && <Link to="/getInventory">Inventory</Link>}
                { isAuthorized === "Admin" && <p>|</p>}
                { isAuthorized === "Admin" && <Link to="/getStaff">Staff</Link>}
                { isAuthorized === "Admin" && <p>|</p>}
                { isAuthorized === "Admin" && <Link to="/getStores">Stores</Link>}
                { isAuthorized === "Admin" && <p>|</p>}
                <li onClick={logout}>Logout</li>
            </ul>
            <FontAwesomeIcon 
                    icon={faBars}
                    className="hamburger"
                    onClick={toggleHamburger}/>
        </div>
     );
}
 
export default Navigation;