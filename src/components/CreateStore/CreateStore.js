import { useState } from "react";
import "./CreateStore.css"
import Create from "./Create.png"
import Manager from "./Manager.png"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CreateStore = ({ isAuthorized, userID }) => {
    //Get id from session storage
    const object  = JSON.parse(sessionStorage.getItem("token"))

    //Initialize use history
    const history = useHistory();
    const[page, setPage] = useState(2)
    const[addManager, setAddManager] = useState(false)
    const[count, setCount] = useState(1);
    const[form, setForm] = useState({
        storename: "",
        region: "",
        firstname: "",
        firstname2: "",
        lastname: "",
        lastname2: "",
        phone: "",
        phone2: "",              
        email: "",
        email2: "",
        password: "",
        password2: "",
        permission: "",
        permission2: "",
        owner: object.id
    });

    //Progressive form handler
    const progressiveHandler = ()=>{
        if(count < 2){
            setCount(count + 1);
        }
    }

    //Capture form data on change
    const changeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setForm({...form,[name]:value});
    }

    //Add second manager
    const addSecondManager = ()=>{
        setAddManager(prevState=>{
            return !prevState
        })
    }

    //Submit form data
    const submitHandler = (event)=>{

        event.preventDefault();

        fetch("/api/createStore", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form)
        })
        .then(res=>{
            if(!res.ok){
                throw Error("Error encountered in posting Store.");
            }
            return res.json();
        })
        .then(data=>{
            console.log(data);
            setForm({
                storename: "",
                region: "",
                firstname: "",
                firstname2: "",
                lastname: "",
                lastname2: "",
                phone: "",
                phone2: "",              
                email: "",
                email2: "",
                password: "",
                password2: "",
                permission: "",
                permission2: ""
            });
            
            //Redirect
            history.push("/getStores")

        })
        .catch(e=>{
            console.warn(e.message);
        })
    }


    const managerForm = 
                    <div className="form1">
                        <div className="input-wrapper">
                            <label for=""firstname2>Manager 2 Firstname</label>
                            <input 
                                type="text" 
                                name="firstname2"
                                required
                                value={form.firstname2}
                                onChange={changeHandler} />
                        </div>
                        <div className="input-wrapper">
                            <label for="lastname2">Manager 2 Lastname</label>
                            <input 
                                type="text" 
                                name="lastname2"
                                required
                                value={form.lastname2}
                                onChange={changeHandler} />
                        </div> 
                        <div className="input-wrapper">
                            <label>Manager 2 Mobile</label>
                            <input 
                                type="tel" 
                                name="phone2"
                                placeholder="254711222333" 
                                required
                                value={form.phone2}
                                onChange={changeHandler} />
                        </div> 
                        <div className="input-wrapper">
                            <label for="manager2email">Manager 2 Email</label>
                            <input 
                                type="email" 
                                name="email2"
                                required
                                value={form.email2}
                                onChange={changeHandler} />
                        </div>
                        <div className="input-wrapper">
                            <label for="manager2password">Manager 2 Password</label>
                            <input 
                                type="password" 
                                name="password2"
                                required
                                value={form.password2}
                                onChange={changeHandler} />
                        </div> 
                        <div className="input-wrapper">
                            <label for="manager2permissions">Mannager 2 Permissions</label>
                            <select
                                name="permission2"
                                required
                                value={form.permission2}
                                onChange={changeHandler}>
                                <option value="">Select second manager's permissions ...</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>  

                    </div>

    return ( <>
                {object.role !== "Admin" && <div>Unauthorized user</div>}
                { object.role === "Admin" && <div className="wrapper-create-store">
                <h2 className="main-title">Create Store</h2>
                <form onSubmit={submitHandler}> 
                    {count === 1 &&
                    (<div className="form1">
                            <img className="image" alt="form-deco" src={Create}/>
                            <div className="input-wrapper">
                                <label for='storename'>Storename</label>
                                <input 
                                    type="text" 
                                    name="storename" 
                                    required
                                    value={form.storename}
                                    onChange={changeHandler} />
                            </div>
                            <div className="input-wrapper">
                                <label for="region">Region</label>
                                <input 
                                    type="text" 
                                    name="region"
                                    required
                                    value={form.region}
                                    onChange={changeHandler} />
                            </div>
                            <div className="input-wrapper">
                                <label for="firstname">Firstname</label>
                                <input 
                                    type="text" 
                                    name="firstname"
                                    required
                                    value={form.firstname}
                                    onChange={changeHandler} />
                            </div> 
                            <div className="input-wrapper">
                                <label for="lastname">Lastname</label>
                                <input 
                                    type="text" 
                                    name="lastname"
                                    required
                                    value={form.lastname}
                                    onChange={changeHandler} />
                            </div> 

                    </div>) }


                    {count === 2 &&
                    (<div className="form1">
                            <img className="image" src={Manager}/>
                            <div className="input-wrapper">
                                <label for="mobile">Mobile</label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    required
                                    value={form.phone}
                                    onChange={changeHandler} />
                            </div> 

                            <div className="input-wrapper">
                                <label for="email">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    required
                                    value={form.email}
                                    onChange={changeHandler} />
                            </div>
                            <div className="input-wrapper">
                                <label for="password">Password</label>
                                <input 
                                    type="text" 
                                    name="password" 
                                    required
                                    value={form.password}
                                    onChange={changeHandler} />
                            </div> 
                            <div className="input-wrapper">
                                <label for="permissions">Permissions</label>
                                <select
                                    name="permission"
                                    required
                                    value={form.permission}
                                    onChange={changeHandler}>
                                    <option value="">Select manager permissions ...</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </div> 
                            <div className="addManager">
                                <div className="child" onClick={addSecondManager}>Add second manager (Optional)</div>
                            </div>

                            {addManager && managerForm}


                    </div>) }
                    

                    {count !== page && <button className="btn next" onClick={progressiveHandler}>Next</button>}
                    {count === page && <button className="btn submit" >Submit</button>}
                </form>
            </div>}
            </>

     );
}

 
export default CreateStore;