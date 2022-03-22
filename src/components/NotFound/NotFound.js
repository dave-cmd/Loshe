import { Link } from "react-router-dom";
import "./NotFound.css"

const NotFound = () => {
    return (
        <div className="wrapper-errorPage">
            <div className="wrapper-errorPage-mobile">
                    <h2>404</h2>
                    <p className="pipe">|</p>
                    <p>This page could not be found</p>

            </div>
            <Link to="/">Dashboard</Link>
        </div>

    );
}
 
export default NotFound;