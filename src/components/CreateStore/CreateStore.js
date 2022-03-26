import { useState } from "react";
import "./CreateStore.css"
import Create from "./Create.png"
import Manager from "./Manager.png"
const CreateStore = () => {

    const[count, setCount] = useState(1);
    const[form, setForm] = useState({
        storename: "",
        region: "",
        manager: "",
        password: "",
        permission: ""
    });

    //progressive form handler
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

    //Submit form data
    const submitHandler = (event)=>{
        event.preventDefault();
        console.log(form)
    }

    return ( 
            <div className="wrapper-create-store">
                <h2 className="main-title">Create Store</h2>
                <form>
                    {count === 1 &&
                    (<div className="form1">
                            <img className="image" src={Create}/>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="storename" 
                                    required
                                    value={form.storename}
                                    placeholder="Store name..."
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

                    </div>) }

                    {count === 2 &&
                    (<div className="form1">
                            <img className="image" src={Manager}/>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="manager" 
                                    required
                                    value={form.manager}
                                    placeholder="Manager's name..."
                                    onChange={changeHandler} />
                            </div>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="password"
                                    placeholder="Manager's password..." 
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
                                    <option value="">Select manager permissions ...</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div> 

                    </div>) }


                    {count === 1 && <button className="btn next" onClick={progressiveHandler}>Next</button>}
                    {count === 2 && <button className="btn submit" onSubmit={submitHandler}>Submit</button>}
                </form>
            </div>
     );
}
 
export default CreateStore;