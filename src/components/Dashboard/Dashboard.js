import "./Dashboard.css"
import DashBoardItem from "../sub-components/DashboardItem/DashBoardItem";
import FeedItem from "../sub-components/FeedItem/FeedItem"


const Dashboard = ()=>{

    return ( 
        <div className="wrapper-dashboard">
            <div className="top-section">
                <h1 className="admin-dash-title">Admin Dashboard</h1>
                <div className="menu-items">
                    <DashBoardItem icon={"productsInIcon"} text={"Products In"}/>
                    <DashBoardItem icon={"productsOutIcon"} text ={"Products Out"}/>
                    <DashBoardItem icon={"almostOutIcon"} text={"Almost Out"}/>
                    <DashBoardItem icon={"storeIcon"} text={"Stores"}/>      
                </div>   
            </div>
            <div className="recent-activity">
                <p className="recent-activity-title">Recent Activity</p>
                <div className="feed">
                    <FeedItem/>
                    <FeedItem />
                    <FeedItem />
                    <FeedItem />
                </div>
            </div>
        </div>
     );
};
 
export default Dashboard;