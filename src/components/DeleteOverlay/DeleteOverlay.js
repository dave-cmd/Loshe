import "./DeleteOverlay.css"

const DeleteOverlay = ({id, deleteStaff, display, setDisplay, deleteError, setDeleteError}) => {
    return ( <div className="deleteOverlay"
                  style={display? {display: "block"}: {display: "none"}}>
                <div className="text-container">
                        {deleteError === false && <div className="error-message">{deleteError}</div>}
                        <div className="deleteText bold">Are you sure?</div>
                        <div className="delete-confirmation">
                                <div className="action update"
                                     >Yes</div>
                                <div className="action delete" onClick={()=>{setDisplay(!display);}}> No </div>
                        </div>
                </div>
             </div> );
}
 
export default DeleteOverlay;