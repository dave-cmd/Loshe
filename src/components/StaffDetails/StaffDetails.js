import "./StaffDetails.css"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faAt } from '@fortawesome/free-solid-svg-icons'

const StaffDetails = () => {
    const {id} = useParams();
    const{data, error} = useFetch('/api/staff/' + id)

    //Icons
    const profileIcon = <FontAwesomeIcon className="profileIcon" icon={faUser} />
    const emailIcon = <FontAwesomeIcon className="emailIcon" icon={faAt} />
    const phoneIcon = <FontAwesomeIcon className="phoneIcon" icon={faPhone} />

    //Fetch from roles table

    //Fetch from stores table

    //Fetch from stores table

    console.log(data.firstname)
    return ( 
        <div className="wrapper-staff-details">
            <h1 className="staff-title">Staff Details</h1>
            { data.length === 0 && error === null  && <div className="status">Fetching resource...</div>}
            { Object.keys(data).length > 0 && error === null && 
                (<>
                    <div className="name-section">
                        {profileIcon}
                        <div>{data.firstname} {data.lastname}</div>
                        <div>Role</div>
                    </div>
                    <div className="contact-section">
                        <div className="phone-details">
                            {phoneIcon}
                            <div className="phone-subsection">
                                <div className="font bold">PHONE</div>
                                <div className="font">{data.phone}</div>
                            </div>
                        </div>
                        <div className="email-details">
                            {emailIcon}
                            <div className="email-subsection">
                                <div className="font bold">EMAIL</div>
                                <div className="font">{data.email}</div>
                            </div>
                        </div>
                    </div>
                    <div className="store-section">stores</div>
                    <div className="action-section">
                        <div className="action update">Delete</div>
                        <div className="action delete">Update</div>
                    </div>
                </>)
            }
            { error !== null && <div className="status error">{error}</div>}
        </div>
     );
}
 
export default StaffDetails;