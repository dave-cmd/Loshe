import "./DashboardItem.css"

const DashBoardItem = (props) => {

    return ( 
        <div className="store-dashItem" onClick={()=>{props.click()}} >
            <p className=" font">{props.counter}</p>
            <p className="font bold">{props.text}</p>
        </div>
     );
}
 
export default DashBoardItem;