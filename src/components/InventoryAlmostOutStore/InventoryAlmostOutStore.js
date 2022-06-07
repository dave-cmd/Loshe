import "./InventoryAlmostOutStore.css"
import RequestItem from "../sub-components/RequestItem/RequestItem";
import useFetch from "../hooks/useFetch";

const InventoryAlmostOutStore = () => {

    //Obtain credentials from session
    const object  = JSON.parse(sessionStorage.getItem("token"))

    //Fetch almost out data
     const {data, error}= useFetch("/api/getProductsAlmostOut/" + object.id)

    //Iterate over the fetched data
    const elements = data.map(item =>{
        return <RequestItem key={item.id}
                            productname={item.productname}
                            location={item.location}
                            quantity = {item.quantity}
                            id = {item.id}
                            />
    })

    return ( <div className="wrapper-staff-details">
                <div className="name-section">
                    <div className="main-title">Low Stock</div>
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
 
export default InventoryAlmostOutStore;