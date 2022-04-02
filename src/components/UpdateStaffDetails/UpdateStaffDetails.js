import "./UpdateStaffDetails.css"
import { useEffect, useState } from "react";
import UpdateImage from "./updateDetails.png"
import useFetch from "../hooks/useFetch"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UpdateStaffDetails = () => {

    //Redirection
    const history = useHistory()

    //use paramas
    const {id} = useParams()

    //Fetch user data
    const {data, setError} = useFetch("/api/staff/" + id);

    //Form state
    const[form, setForm] = useState({
        firstname: "",
        lastname: "",
        phone: "",              
        email: "",
        password: "",
        role: "",
        store: ""
    });

    //setFormData
    useEffect(()=>{
        if(Array.isArray(data) ===  false){
            console.log("--useEffect--")
            console.log(data)

            //Stringify stores
            let stores_str = ""

            //Check if response is an array
            if (Array.isArray(data.store) === true){
                data.store.map((store, i)=>{
                    // console.log("Array")
                    stores_str += store.storename
                    if (i < data.store.length - 1){
                        stores_str += ",";
                    }
                })
            }
            else if (typeof data.store === 'object') {
               stores_str += data.store.storename
            }

            setForm({
                firstname: data.firstname,
                lastname: data.lastname,
                phone: data.phone,              
                email: data.email,
                password: "",
                role: data.role_id === 1 ? "Admin" : "Manager",
                store: stores_str
            })
        }
    },[data])

    
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
        fetch("/api/updateStaff/" + id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
        .then(res=>{
            if(!res.ok){
                throw Error("Error encountered in updating staff.");
            }
            return res.json();
        })
        .then(data=>{
            // console.log(data);
            history.push("/staff/"+ id)
        })
        .catch(e=>{
            console.warn(e.message);
        })
    }

    return ( 
            <div className="wrapper-create-store">
                <h2 className="main-title">Update Staff Details</h2>
                <form onSubmit={submitHandler}> 
                    <div className="form1">
                            <img className="image" src={UpdateImage}/>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="firstname"
                                    value={form.firstname}
                                    required
                                    placeholder="Firstname..."
                                    onChange={changeHandler} />
                            </div>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="lastname"
                                    placeholder="Lastname..." 
                                    required
                                    value={form.lastname}
                                    onChange={changeHandler} />
                            </div>
                            <div className="inp">
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email..."
                                    required
                                    value={form.email}
                                    onChange={changeHandler} />
                            </div> 
                            <div className="inp">
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder="Phone number..."
                                    required 
                                    value={form.phone}
                                    onChange={changeHandler} />
                            </div> 

                            <div className="inp">
                                <input 
                                    type="password" 
                                    name="password"
                                    placeholder="[Leave blank to leave password unchanged.]" 
                                    value={form.password}
                                    onChange={changeHandler} />
                            </div> 
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="store"
                                    placeholder="[Enter stores as comma separated values.]" 
                                    value={form.store}
                                    onChange={changeHandler} />
                            </div> 
                            <div className="inp">
                                <select
                                    name="role"
                                    value={form.role}
                                    required
                                    onChange={changeHandler}>
                                    <option value="">Select manager permissions ...</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div> 

                    </div>
                    <button className="btn submit" >Update</button>
                </form>
            </div>
     );
}
 
export default UpdateStaffDetails;