import "./UpdateStoreDetails.css"
import { useEffect, useState } from "react";
import UpdateImage from "./updateDetails.png"
import useFetch from "../hooks/useFetch"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UpdateStoreDetails = () => {

    //Redirection
    const history = useHistory()

    //use paramas
    const {id} = useParams()


    const[addManager, setAddManager]  = useState(false)
    // const [showAddManager, setShowAddManager] = useState(false)

    //Fetch store data
    const {data, setError} = useFetch("/api/store/" + id);

    // console.log(Array.isArray(data))

    //Form state
    const[form, setForm] = useState({
        storename: "",
        region: "",
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        permission: ""
    });

    //setFormData
    useEffect(()=>{
        if (Array.isArray(data) === false) {
            setForm({
                storename: data.storename,
                region: data.region,
            })
        }
        console.log(data.users)
    }
    ,[data])

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
        fetch("/api/updateStore/" + id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
        .then(res=>{
            if(!res.ok){
                throw Error("Error encountered in updating store.");
            }
            return res.json();
        })
        .then(data=>{
            console.log(data);
            history.push("/store/"+ id)
        })
        .catch(e=>{
            console.warn(e.message);
        })
    }

    //Add second manager
    const addSecondManager = ()=>{
        setAddManager(prevState=>{
            return !prevState
        })
    }

    //Add manager form
    const managerForm = 
                        <div className="form1">
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="firstname"
                                    placeholder="Second manager's firstname..." 
                                    required
                                    value={form.firstname}
                                    onChange={changeHandler} />
                            </div>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="lastname"
                                    placeholder="Second manager's lastname..." 
                                    required
                                    value={form.lastname}
                                    onChange={changeHandler} />
                            </div> 
                            <div className="inp">
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder="254711222333" 
                                    required
                                    value={form.phone}
                                    onChange={changeHandler} />
                            </div> 
                            <div className="inp">
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Second manager's email" 
                                    required
                                    value={form.email}
                                    onChange={changeHandler} />
                            </div>
                            <div className="inp">
                                <input 
                                    type="password" 
                                    name="password"
                                    placeholder="Second manager's password" 
                                    required
                                    value={form.password}
                                    onChange={changeHandler} />
                            </div> 
                            <div className="inp">
                                    <select
                                        name="permission"
                                        required
                                        value={form.permission}
                                        onChange={changeHandler}>
                                        <option value="">Select second manager's permissions ...</option>
                                        <option value="Manager">Manager</option>
                                    </select>
                            </div>  
                        </div>


    return ( 
            <div className="wrapper-create-store">
                <h2 className="main-title">Update Store</h2>
                <form onSubmit={submitHandler}> 
                    <div className="form1">
                            <img className="image" src={UpdateImage}/>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="storename"
                                    value={form.storename}
                                    required
                                    placeholder="Storename..."
                                    onChange={changeHandler} />
                            </div>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="region"
                                    placeholder="Region..." 
                                    required
                                    value={form.region}
                                    onChange={changeHandler} />
                            </div>
                            { Array.isArray(data.users) === false && <div className="addManager">
                                <div className="child" onClick={addSecondManager}>Add second manager (Optional)</div>
                            </div>}

                            { addManager && managerForm}
                    </div>
                    <button className="btn submit" >Update</button>
                </form>
            </div>
     );
}
 
export default UpdateStoreDetails;