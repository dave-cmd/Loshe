import useFetch from "../hooks/useFetch";
import "./Stores.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


const Stores = () => {
    //Get id from session storage
    const object  = JSON.parse(sessionStorage.getItem("token"))

    //Fetch the data by owner
    const{data, error} = useFetch("/api/getStoresAdmin/" + object.id)
    const infoIcon = <FontAwesomeIcon className="overlayIcons" icon={faInfoCircle} />

    //Map through fetched data to create staff elements
    const elements = data.map(elem =>{
        return <Link to={`/store/${elem.id}`} key={elem.id} className="staff-link">
                    <div
                        className="staff-element">
                            <h4>{elem.storename}</h4>
                            {infoIcon}
                    </div>
               </Link>})
    

    return (
        <>
        {object.role !== "Admin" && <div>Unauthorized user.</div>}
        {object.role === "Admin" && <div className="wrapper-staff">
            <h1 className="staff-title">Stores</h1>
            { data.length === 0 && error === null  && <div>Fetching stores...</div>}
            {error === null && data.length > 0 && <div className="staff-list">{elements}</div>}
            { error !== null && <div>{error}</div>}
        </div>}
        </> 

     );
}
 
export default Stores;