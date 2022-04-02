import useFetch from "../hooks/useFetch";
import "./Inventory.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";


const Staff = () => {
    const{data, error} = useFetch("/api/getProducts")
    const infoIcon = <FontAwesomeIcon className="overlayIcons" icon={faInfoCircle} />

    //Map through fetched data to create inventory elements
    const elements = data.map(elem =>{
        return <Link to={`/inventory/${elem.id}`} key={elem.id} className="staff-link">
                    <div
                        className="staff-element">
                            <h4>{elem.productname}</h4>
                            {infoIcon}
                    </div>
               </Link>})
    

    return ( 
        <div className="wrapper-staff">
            <h1 className="staff-title">Inventory</h1>
            { data.length === 0 && error === null  && <div>Fetching resource...</div>}
            {error === null && data.length > 0 && <div className="staff-list">{elements}</div>}
            { error !== null && <div>{error}</div>}
        </div>
     );
}
 
export default Staff;