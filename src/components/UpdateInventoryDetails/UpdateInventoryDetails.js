import "./UpdateInventoryDetails.css"
import { useEffect, useState } from "react";
import UpdateImage from "./updateDetails.png"
import useFetch from "../hooks/useFetch"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UpdateInventoryDetails = () => {

    //Redirection
    const history = useHistory()

    //use paramas
    const {id} = useParams()

    //Fetch user data
    const {data, setError} = useFetch("/api/product/" + id);

    //Fetch product category
    const {data:category, setCategoryError} = useFetch("/api/category/" + data.category_id);
    
    //Form state
    const[form, setForm] = useState({
        productname: "",
        price: "",
        description: "",
        quantity: "",
        category: ""
    });

    //setFormData
    useEffect(()=>{
        if(Array.isArray(data) ===  false && Array.isArray(category) === false){
            setForm({
                productname: data.productname,
                price: data.price,
                description: data.description,
                quantity: data.quantity,
                // category: typeof category === 'object' ? category.category : ""
                category : category.category
            })
        }
    },[data, category])

    
    //Capture form data on change
    const changeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setForm({...form,[name]:value});
    }

    //Submit form data
    const submitHandler = (event)=>{
        event.preventDefault();
        console.log(form)
        fetch("/api/updateProduct/" + id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
        .then(res=>{
            if(!res.ok){
                throw Error("Error encountered in updating product.");
            }
            return res.json();
        })
        .then(data=>{
            console.log(data);
            // history.push("/inventory/"+ id)
            history.push("/getInventory")
        })
        .catch(e=>{
            console.warn(e.message);
        })
    }

    return ( 
            <div className="wrapper-create-store">
                <h2 className="main-title">Update Inventory</h2>
                <form onSubmit={submitHandler}> 
                    <div className="form1">
                            <img className="image" src={UpdateImage}/>
                            <div className="input-wrapper">
                                <label for="productname">Productname</label>
                                <input 
                                    type="text" 
                                    name="productname"
                                    value={form.productname}
                                    required
                                    onChange={changeHandler} />
                            </div>
                            <div className="input-wrapper">
                                <label for="description">Description</label>
                                <textarea 
                                    type="text" 
                                    name="description"
                                    placeholder="description..." 
                                    required
                                    value={form.description}
                                    onChange={changeHandler} />
                            </div>
                            <div className="input-wrapper">
                                <label for="price">Price</label>
                                <input 
                                    type="price" 
                                    name="price"
                                    required
                                    value={form.price}
                                    onChange={changeHandler} />
                            </div> 
                            <div className="input-wrapper">
                                <label for="quantity">Quantity</label>
                                <input 
                                    type="text" 
                                    name="quantity"
                                    required 
                                    value={form.quantity}
                                    onChange={changeHandler} />
                            </div> 

                            <div className="input-wrapper">
                                <label for="category">Category</label>
                                <select
                                    name="category"
                                    value={form.category}
                                    required
                                    onChange={changeHandler}>
                                    <option value="">Select category ...</option>
                                    <option value="Apparrel & Accessories">Apparrel & Accessories</option>
                                    <option value="Style & Fashion">Style & Fashion</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Medical health">Medical health</option>
                                    <option value="Foods & Beverages">Food & Beverages</option>
                                    <option value="Electronics">Electronics</option>
                                </select>
                            </div> 

                    </div>
                    <button className="btn submit" >Update</button>
                </form>
            </div>
     );
}
 
export default UpdateInventoryDetails;