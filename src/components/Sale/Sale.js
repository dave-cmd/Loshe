import "./Sale.css"
import SaleItem from "../sub-components/SaleItem/SaleItem";
import useFetch from "../hooks/useFetch";

const Sale = () => {

    //Current user object
    const object = JSON.parse(sessionStorage.getItem('token'))

    //Fetch all products from the Base by owner ID
    const{data:baseProducts, error} = useFetch("/api/getStoreProducts/" + object.store)

    //Map over baseProducts
    const elements  = baseProducts.map(prod=>{
        return <SaleItem  key={prod.id}
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
                    <div className="main-title">Sell Products</div>
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
 
export default Sale;