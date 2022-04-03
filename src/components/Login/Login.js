import "./Login.css"
import {useState} from 'react'
import PropTypes from 'prop-types';
import Signup from "../Signup/Signup";

const Login = ({setToken}) => {

    const[loginForm, setLoginForm] = useState({
        email : "",
        password : ""
    })

    const[visible, setVisible]=useState({
        login : true,
        signup : false
    })

    const changeHandler = (event)=>{
            const name  = event.target.name
            const value = event.target.value
            setLoginForm({...loginForm, [name]:value})
        }

    const submitHandler = (event)=>{
        event.preventDefault()

        fetch("/api/login", {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginForm)
        })
        . then(res=>{
            if(!res.ok){
                throw Error("Error occured in login route.")
            }
            else{
                return res.json()
            }
        })
        .then(data=>{
            setToken(data)
            setLoginForm({
                email:"",
                password:""
            })
            console.log(data);
        })
        .catch(err=>{
            console.log(err.message)
        })
    }

    const toggleForms = ()=>{
        console.log("toggle engaged!!")
        setVisible({...visible, login: !visible.login, signup:!visible.signup})
    }
    return (
        <>
        {visible.login === true &&   <div className="login-wrapper">
                <h1>Login</h1> 
                <form onSubmit={submitHandler}>
                    <label>
                        <p>Email</p>
                        <input type="email"
                            required 
                            onChange={changeHandler}
                            name="email"
                            value={loginForm.email}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={changeHandler}
                            required
                            name="password"
                            value={loginForm.password} />
                    </label>
                    <div className="buttons">
                        <button type="submit" className="action update">Login</button>
                        <button type="submit" className="action update" onClick={toggleForms}>Register</button>
                        {/* <p onClick={toggleForms}>Signup ?</p> */}
                    </div>
                </form> 
            </div>
            }

            {visible.signup && <Signup toggleForms={toggleForms}/>}
        </>

     );
     Login.propTypes =  {
         setToken: PropTypes.func.isRequired
     }
}
 
export default Login;