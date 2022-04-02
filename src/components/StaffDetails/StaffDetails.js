import "./StaffDetails.css"
import { Redirect, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../hooks/useFetch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone, faAt } from '@fortawesome/free-solid-svg-icons'
import DeleteOverlay from "../DeleteOverlay/DeleteOverlay";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const StaffDetails = () => {
    const {id} = useParams();
    const{data, error, isFetching} = useFetch('/api/staff/' + id)

    //Delete error
    const[deleteError, setDeleteError] = useState(false)

    //Instanciate history for redirects
    const history = useHistory();

    //Toggle deleteOverlay visibility
    const [displayDeleteOverlay, setDisplayDeleteOverlay] = useState(false)

    //Delete activation
    const [deleteActive, setDeleteActive] = useState(false)
   
    //Icons
    const profileIcon = <FontAwesomeIcon className="profileIcon" icon={faUser} />
    const emailIcon = <FontAwesomeIcon className="emailIcon" icon={faAt} />
    const phoneIcon = <FontAwesomeIcon className="phoneIcon" icon={faPhone} />

    //Fetch from roles table
    const {data:role, error: errorRole} = useFetch('/api/role/' + data.role_id)

    //Activate delete overlay
    const activateDeleteOverlay = ()=>{
        setDisplayDeleteOverlay(!displayDeleteOverlay)
        console.log("deleteOverlay activated!!!")
    }

    //Delete staff
    const deleteStaff = (id) =>{
        fetch("/api/deleteStaff/" + id, {
            method: 'DELETE',
        })
        .then(res=>{
            if(!res.ok){
                throw Error("Error deleting staff memeber");
            }
            return res.json()
        })
        .then(data=>{
            console.log(data);
            setDisplayDeleteOverlay(false);
            history.push("/getStaff")
        })
        .catch(e=>{
            setDeleteError(e.message)
            console.log(e.message)
        })
    }

    //Redirect to update
    const redirectToUpdate = ()=>{
        history.push("/updateStaffDetails/" + id);
    }

    console.log(deleteActive)
    return ( 
        
        <div className="wrapper-staff-details">
            <DeleteOverlay display={displayDeleteOverlay}              
                           setDisplay= {setDisplayDeleteOverlay}
                           id={id}
                           deleteStaff={deleteStaff}
                           deleteError={deleteError}
                           setDeleteError={setDeleteError}/>
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
                        })): typeof data.store === 'object'? (<div>{data.store.storename}</div>): <div>No store available</div>}
                    </div>
                    <div className="action-section">
                        <div className="action update" onClick={redirectToUpdate}>Update</div>
                        <div className="action delete" onClick={()=>{activateDeleteOverlay();}}>Delete</div>
                    </div>
                </>)
            }
            { error !== null && <div className="status error">{error}</div>}
        </div>
     );
}
 
export default StaffDetails;