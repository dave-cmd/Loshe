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

    //Fetch store data
    const {data, setError} = useFetch("/api/store/" + id);

    //Form state
    const[form, setForm] = useState({
        storename: "",
        region: ""
    });

    //setFormData
    useEffect(()=>{
        if (typeof data === 'object') {
            setForm({
                storename: data.storename,
                region: data.region,
            })
        }
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
            // console.log(data);
            history.push("/store/"+ id)
        })
        .catch(e=>{
            console.warn(e.message);
        })
    }

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
                    </div>
                    <button className="btn submit" >Update</button>
                </form>
            </div>
     );
}
 
export default UpdateStoreDetails;