import "./DeleteOverlay.css"

const DeleteOverlay = ({id, deleteStaff, display, setDisplay, deleteError, setDeleteError}) => {
    return ( <div className="deleteOverlay"
                  style={display? {display: "block"}: {display: "none"}}>
                <div className="text-container">
                        {deleteError === false && <div className="error-message">{deleteError}</div>}
                        <div className="deleteText bold">Confirm delete?</div>
                        <div className="delete-confirmation">
                                <div className=" delete-button-background" onClick={()=>{deleteStaff(id)}}>{deleteError ? 'Error deleting resource': 'Yes'}</div>
                                <div className="action update" onClick={()=>{setDisplay(!display);}}> No </div>
                        </div>
                </div>
             </div> );
}
 
export default DeleteOverlay;