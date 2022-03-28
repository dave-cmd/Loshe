
import "./Navigation.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({setToken, toggleHamburger, logout}) => {

    return ( 
        <div className="navigation-wrapper">
            <h1 className="nav-title"></h1>
            <ul className="links">
                {/* <li><a href="/">Home</a></li> */}
                <Link to="/">Home</Link>
                <p>|</p>
                <Link to="/createStore">Create Store</Link>
                <p>|</p>
                <Link to="/createInventory">Create Inventory</Link>
                <p>|</p>
                <Link to="/getInventory">Inventory</Link>
                <p>|</p>
                <Link to="/getStaff">Staff</Link>
                <p>|</p>
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