import { useState } from "react";
import "./CreateStore.css"
import Create from "./Create.png"
import Manager from "./Manager.png"
const CreateStore = () => {

    const[count, setCount] = useState(1);

    //progressive form handler
    const progressiveHandler = ()=>{
        if(count < 2){
            setCount(count + 1);
        }
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
                                    required=""
                                    placeholder="Store name..." />
                            </div>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="region"
                                    placeholder="Region..." 
                                    required="" />
                            </div> 

                    </div>) }

                    {count === 2 &&
                    (<div className="form1">
                            <img className="image" src={Manager}/>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="manager" 
                                    required=""
                                    placeholder="Manager's name..." />
                            </div>
                            <div className="inp">
                                <input 
                                    type="text" 
                                    name="password"
                                    placeholder="Manager's password..." 
                                    required="" />
                            </div> 
                            <div className="inp">
                                <select>
                                    <option value="">Permissions</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div> 

                    </div>) }


                    {count === 1 && <button className="btn next" onClick={progressiveHandler}>Next</button>}
                    {count === 2 && <button className="btn submit" onClick={progressiveHandler}>Submit</button>}
                </form>
            </div>
     );
}
 
export default CreateStore;