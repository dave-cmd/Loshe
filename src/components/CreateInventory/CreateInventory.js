import "./CreateInventory.css"
import { useState } from "react";
const CreateInventory = () => {

    const[count, setCount] = useState(1);
    const[form, setForm] = useState({
        productname: "",
        description: "",
        price: "",
        quantity: "",
        category: ""
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
        console.warn(form);
    }

    return ( 
        <div className="wrapper-create-store">
        <h2 className="main-title">Create Inventory</h2>
        <form>
            {count === 1 &&
            (<div className="form1">
                    {/* <img className="image" src={Create}/> */}
                    <div className="inp">
                        <input 
                            type="text" 
                            name="productname" 
                            required=""
                            placeholder="Product name..."
                            value={form.productname}
                            onChange={changeHandler} />
                    </div>
                    <div className="inp">
                        <textarea 
                            type="text" 
                            name="description"
                            placeholder="Description..." 
                            required=""
                            value={form.description}
                            onChange={changeHandler} />
                    </div> 

            </div>) }

            {count === 2 &&
            (<div className="form1">
                    {/* <img className="image" src={Manager}/> */}
                    <div className="inp">
                        <input 
                            type="number"
                            name="price" 
                            required
                            placeholder="Price..."
                            value={form.price}
                            onChange={changeHandler} />
                    </div>
                    <div className="inp">
                        <input 
                            type="number" 
                            name="quantity"
                            placeholder="Quantity..." 
                            required
                            value={form.quantity}
                            onChange={changeHandler} />
                    </div> 
                    <div className="inp">
                        <select
                            name="category"
                            value={form.category}
                            onChange={changeHandler}>
                            <option value="">Select category ...</option>
                            <option value="Apparrel & Accessories">Apparrel & Accessories</option>
                            <option value="Style & Fashion">Style & Fashion</option>
                            <option value="Sports">Sports</option>
                            <option value="Medical health">Medical health</option>
                            <option value="Electronics">Electronics</option>
                        </select>
                    </div> 

            </div>) }


            {count === 1 && <button className="btn next" onClick={progressiveHandler}>Next</button>}
            {count === 2 && <button className="btn submit" onClick={submitHandler}>Submit</button>}
        </form>
    </div>
     );
}
 
export default CreateInventory;