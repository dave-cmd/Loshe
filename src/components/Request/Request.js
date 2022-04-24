import "./Request.css"
import RequestItem from "../sub-components/RequestItem/RequestItem";
import useFetch from "../hooks/useFetch";

const Request = () => {

    //Current user object
    const object = JSON.parse(sessionStorage.getItem('token'))

    //Fetch all products from the Base by owner ID
    const{data:baseProducts, error} = useFetch("/api/getProductsAdmin/" + object.owner)

    //Map over baseProducts
    const elements  = baseProducts.map(prod=>{
        return <RequestItem  key={prod.id}
                             id = {prod.id}
                             productname={prod.productname}
                             location={prod.location}
                             quantity={prod.quantity}
                             owner={prod.owner}
                             /> 
    })

    // console.log(object)
    
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
                    {elements}
                </div>

            </div> );
}
 
export default Request;