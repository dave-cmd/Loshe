
import "./Navigation.css"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const Navigation = ({setToken, toggleHamburger, logout, isAuthorized, socket}) => {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        socket?.on("getNotification", (data) => {
            console.log("data.data ",data.data)
            // setNotifications((prev) => [...prev, ...[...new Set(data.data.map(item=> item))]]);
            setNotifications(prev=>[...prev, ...data.data])

        });
      }, [socket]);

    console.log("Notifications", notifications)

    // Mark notifications as read
    const hanldeReadNotifications = ()=>{
        setNotifications([])
        setOpen(false)
    }

    return ( 
        <div className="navigation-wrapper">
            <div className="icon">
                <FontAwesomeIcon icon={faBell} className="iconImg" onClick={()=>setOpen(!open)}/>
                { notifications.length > 0 && <div className="counter">{notifications.length}</div>}
            </div>
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

            { open && (<div className="notifications">
                { notifications.length === 0  && <span className="emptyNotifications">You are up to date ...</span> }
                { notifications.length !== 0 && notifications.map(item=>{
                    console.log("Item",item)
                    return <div className="notification-wrapper" key={item.datetime}>
                            <span className="notificationItem" >Order {item.orderStatus.status} from {item.senderName}, {item.storename}.</span>
                            <span className="notification-time">{item.datetime}.</span>
                        </div>
                })}
                <div className="nButton" onClick={hanldeReadNotifications}>Mark as read</div>
            </div>) }
        </div>
     );
}
 
export default Navigation;