import "./Request.css"
import RequestItem from "../sub-components/RequestItem/RequestItem";

const Request = () => {
    return ( <div className="wrapper-staff-details">
                <div className="name-section">
                    <div className="main-title">Request Inventory</div>
                </div>

                <div className="action-section">
                    <input type="search"
                           className="search"
                           placeholder="Search..." />
                </div>

                <div className="action-section height display">
                    <RequestItem />
                    <RequestItem />
                </div>

            </div> );
}
 
export default Request;