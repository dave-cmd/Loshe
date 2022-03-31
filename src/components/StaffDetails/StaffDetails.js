import "./StaffDetails.css"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faAt, faL } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";

const StaffDetails = () => {
    const {id} = useParams();
    const{data, error, isFetching} = useFetch('/api/staff/' + id)

    //Icons
    const profileIcon = <FontAwesomeIcon className="profileIcon" icon={faUser} />
    const emailIcon = <FontAwesomeIcon className="emailIcon" icon={faAt} />
    const phoneIcon = <FontAwesomeIcon className="phoneIcon" icon={faPhone} />

    //Fetch from roles table
    const {data:role, error: errorRole} = useFetch('/api/role/' + data.role_id)
    
    return ( 
        <div className="wrapper-staff-details">
            <h1 className="staff-title">Staff Details</h1>
            { data.length === 0 && error === null  && <div className="status">Fetching resource...</div>}
            { isFetching=== false && Object.keys(data).length > 0 && error === null && 
                (<>
                    <div className="name-section">
                        {profileIcon}
                        <div>{data.firstname} {data.lastname}</div>
                        <div className="bold">{role.role}</div>
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
                    <div className="store-section">
                        { Array.isArray(data.store) ? (data.store.map(store=>{
                            return <div key={store.id}>
                                        <div className="font bold">{store.storename}</div>
                                        <div className="font">{store.region}</div>
                                    </div>
                        })): (<div>No stores available</div>)}
                    </div>
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