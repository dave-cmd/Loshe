import "./CreateInventory.css"
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Inventory1 from "./Inventory1.png"
import Inventory2 from "./Inventory2.png"

const CreateInventory = ({ isAuthorized, userID }) => {
    //Get credentials from session
    const object = JSON.parse(sessionStorage.getItem("token"))

    //Initialize use history
    const history = useHistory();

    const[count, setCount] = useState(1);
    const[form, setForm] = useState({
        productname: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        owner: object.id
    });


    //Progressive form handler
    const progressiveHandler = ()=>{
        if(count < 2){
            setCount(count + 1);
        }
    }

    //Set form data on change event
    const changeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setForm({...form,[name]:value});
    }

    //Submit form data
    const submitHandler = (event)=>{
        event.preventDefault();

        fetch("/api/createInventory", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
        .then(res=>{
            if(!res.ok){
                throw Error("Error encountered in posting Inventory.");
            }
            return res.json();
        })
        .then(data=>{
            console.log(data);
            setForm({
                productname: "",
                description: "",
                price: "",
                quantity: "",
                category: ""
            });

            //Redirect on success
            history.push("/getInventory")
        })
        .catch(e=>{
            console.warn(e.message);
        })
    }

    return (
        <>
        {object.role !== "Admin" && <div>Unauthorized user</div>}
        {object.role === "Admin" && <div className="wrapper-create-store">
        <h2 className="main-title">Create Inventory</h2>
        <form onSubmit={submitHandler}>
            {count === 1 &&
            (<div className="form1">
                    <img className="image" alt="form-deco" src={Inventory1}/>
                    <div className="input-wrapper">
                        <label htmlFor="productname">Productname</label>
                        <input type="email"
                            className="login-inputs" 
                            onChange={changeHandler}
                            name="productname"
                            value={form.productname}/>
                    </div>


                    <div className="input-wrapper">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            type="text" 
                            name="description"
                            placeholder="Description..." 
                            required
                            value={form.description}
                            onChange={changeHandler} />
                    </div> 

            </div>) }

            {count === 2 &&
            (<div className="form1">
                    <img className="image" alt="form-deco" src={Inventory2}/>
                    <div className="input-wrapper">
                        <label htmlFor="price">Price</label>
                        <input 
                            type="number"
                            name="price" 
                            required
                            value={form.price}
                            onChange={changeHandler} />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="quantity">Quantity</label>
                        <input 
                            type="number" 
                            name="quantity"
                            required
                            value={form.quantity}
                            onChange={changeHandler} />
                    </div>

                    <div className="input-wrapper">
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={changeHandler}>
                            <option value="">Select category ...</option>
                            <option value="Apparrel & Accessories">Apparrel & Accessories</option>
                            <option value="Style & Fashion">Style & Fashion</option>
                            <option value="Sports">Sports</option>
                            <option value="Pets & Pet Supplies">Pets & Pet Supplies</option>
                            <option value="Medical health">Medical health</option>
                            <option value="Foods & Beverages">Food & Beverages</option>
                            <option value="Consumer Electronics">Consumer Electronics</option>
                            <option value="Children & Infants">Children & Infants</option>
                        </select>
                    </div>

            </div>) }
            
            {count === 1 && <button className="btn next" onClick={progressiveHandler}>Next</button> }
            {count === 2 && <button type="submit" className="btn submit" >Submit</button> }
        </form>
        </div>}
        </> 
        
     );
}
 
export default CreateInventory;