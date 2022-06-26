import "./Signup.css"
import {useState} from 'react'
import FlashMessage from 'react-flash-message'

const Signup = (props) => {

    const[signupForm, setSignupForm] = useState({
        firstname: "",
        lastname: "",
        email : "",
        phone : "",
        password : "",
        password2 : ""
    })

    const[flashRegister, setFlashRegister] = useState(null)

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
                setFlashRegister(null)
                setFlashRegister("An error occured in the registration route.")
                throw Error("Error occured in the registration route.")
            }
            else{
                return res.json()
            }
        })
        .then(data=>{
            setSignupForm({
                firstname: "",
                lastname: "",
                email : "",
                phone : "",
                password : "",
                password2 : "",
            })
            if(data.Error){
                setFlashRegister(null)
                setFlashRegister(data.Error)
                console.log(data.Error)
            }
            else{
                props.toggleForms()
            }
        })
        .catch(err=>{
            console.log(JSON.stringify(err.message))
        })
    }
    return (
        <div className="signup-wrapper">
                <h1>SignUp</h1>
                
                {flashRegister &&<FlashMessage duration={5000}>
                    <div className="flash">{flashRegister}</div>
                </FlashMessage> }

                <form onSubmit={submitHandler} className="signup-form">
                    <div class="input-wrapper">
                            <label for="firstname">Firstname</label>
                            <input type="text"
                                className="signup-inputs"
                                required 
                                onChange={changeHandler}
                                name="firstname"
                                value={signupForm.firstname}/>

                    </div>

                    <div class="input-wrapper">
                            <label for="lastname">Lastname</label>
                            <input type="text"
                                className="signup-inputs"
                                required 
                                onChange={changeHandler}
                                name="lastname"
                                value={signupForm.lastname}/>
                                
                    </div>

                    <div class="input-wrapper">
                            <label for="email">Email</label>
                            <input type="text"
                                className="signup-inputs"
                                required 
                                onChange={changeHandler}
                                name="email"
                                value={signupForm.email}/>
                                
                    </div>

                    <div class="input-wrapper">
                            <label for="phone">Phone Number</label>
                            <input type="text"
                                className="signup-inputs" 
                                onChange={changeHandler}
                                required
                                name="phone"
                                value={signupForm.phone} />
                                
                    </div>

                    <div class="input-wrapper">
                            <label for="password">Password</label>
                            <input type="password"
                                className="signup-inputs" 
                                onChange={changeHandler}
                                required
                                name="password"
                                value={signupForm.password} />
                                
                    </div>

                    <div class="input-wrapper">
                            <label for="password2">Repeat Password</label>
                            <input type="password"
                                className="signup-inputs" onChange={changeHandler}
                                required
                                name="password2"
                                value={signupForm.password2} />
                                
                    </div>

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