import "./Signup.css"
import {useState} from 'react'

const Signup = (props) => {

    const[signupForm, setSignupForm] = useState({
        firstname: "",
        lastname: "",
        email : "",
        phone : "",
        password : "",
        password2 : ""
    })

    const changeHandler = (event)=>{
        const name  = event.target.name
        const value = event.target.value
        setSignupForm({...signupForm, [name]:value})
    }

    const submitHandler = (event)=>{

        //Prevents page reload onSubmit
        event.preventDefault();

        fetch("/api/signup", {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(signupForm)
        }). then(res=>{
            if(!res.ok){
                throw Error("Error occured in the registration route.")
            }
            else{
                return res.json()
            }
        })
        .then(data=>{
            setSignupForm({
                email:"",
                password:""
            })
            props.toggleForms()
        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    return (
        <div className="signup-wrapper">
                <h1>SignUp</h1> 
                <form onSubmit={submitHandler} className="signup-form">
                <label>
                        {/* <p>Firstname</p> */}
                        <input type="text"
                            className="signup-inputs"
                            required 
                            onChange={changeHandler}
                            name="firstname"
                            placeholder="Firstname"
                            value={signupForm.firstname}/>
                    </label>
                    <label>
                        {/* <p>Lastname</p> */}
                        <input type="text"
                            className="signup-inputs"
                            required 
                            onChange={changeHandler}
                            name="lastname"
                            placeholder="Lastname"
                            value={signupForm.lastname}/>
                    </label>
                    <label>
                        {/* <p>Email</p> */}
                        <input type="email"
                            className="signup-inputs"
                            required 
                            onChange={changeHandler}
                            name="email"
                            placeholder="Email"
                            value={signupForm.email}/>
                    </label>
                    <label>
                        {/* <p>Phone</p> */}
                        <input type="tel"
                            className="signup-inputs"
                            required 
                            onChange={changeHandler}
                            name="phone"
                            placeholder="+254722 222 222"
                            value={signupForm.phone}/>
                    </label>
                    <label>
                        {/* <p>Password</p> */}
                        <input type="password"
                            className="signup-inputs" onChange={changeHandler}
                            required
                            name="password"
                            placeholder="Password"
                            value={signupForm.password} />
                    </label>
                    <label>
                        {/* <p>Confirm Password</p> */}
                        <input type="password"
                            className="signup-inputs" onChange={changeHandler}
                            required
                            name="password2"
                            placeholder="Confirm password"
                            value={signupForm.password2} />
                    </label>
                    <div className="buttons">
                        <button type="submit" className="action update" onClick={props.toggleForms}>Login</button>
                        <button type="submit" className="action update">Register</button>
                        {/* <p onClick={props.toggleForms}>Back to login?</p> */}
                    </div>
                </form> 
        </div>

     );
    //  Signup.propTypes =  {
    //      setToken: PropTypes.func.isRequired
     }

 
export default Signup;