import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import "./RequestItem.css"
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const RequestItem = (props) => {
    //Redirect handler
    const history = useHistory()

    //Logged in user object

    const object = JSON.parse(sessionStorage.getItem('token'))

    //Post checker
    const[posting, setPosting] = useState(false)

    //Post error checker
    const[postError, setPostingError] = useState("")

    //Icons
    const inIcon = <FontAwesomeIcon className='icon-body icon-color' icon={faDownload} />

    //Form
    const[form, setForm] = useState({quantity: isNaN(props.quantity) === false ? props.quantity : "" })

    //Set form data with fetched data
    useEffect(()=>{
        if(isNaN(props.quantity) === false){
            setForm(prevState=>{
            return {...prevState, quantity: props.quantity}
            })
        }
    },
    [props.quantity])

    //Onchange
    const changeHandler = (event)=>{
        setForm(prevState=>{
            return {...prevState, quantity: event.target.value}
        })
    }

    //Click +
    const incrementQuantity = ()=>{
        setForm(prevState =>{
            return {...prevState, quantity: form.quantity + 1}
        })
    }

    //Click -
    const decrementQuantity = ()=>{
        setForm(prevState =>{
            if(form.quantity > 0){
                return {...prevState, quantity: form.quantity - 1} 
            }
            else{
                return prevState
            }
        })
    }

    //Submit update admin
    const submitHandler = (event)=>{
        //Prevent form reload
        event.preventDefault()

        //Set posting
        setPosting(true)

        //Post the form data
        fetch("/api/updateProductAdmin/" + props.id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...form, id: props.id})
        })
        .then(res=>{
            if(!res.ok){
                throw Error("An error occured in updating the product...1")
            }
            return res.json()
        })
        .then(data=>{
            console.log(data)
            setPosting(false)
            history.push("/getInventory")
        })
        .catch(error=>{
            console.log(error.message)
            setPostingError(true)
        })
    }


    //Submit handler manager
    const submitHandlerManager = (event)=>{
        //Prevent reload on submit
        event.preventDefault()

        //Set posting
        setPosting(true)
        
        fetch("/api/updateProductAdmin/" + props.id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...form, id: props.id, manager:object.id, owner: object.owner, storeId: object.store})
        })
        .then(res=>{
            if(!res.ok){
                throw Error("An error occured in updating the product...2")
            }
            return res.json()
        })
        .then(data=>{
            console.log(data)
            setPosting(false)
            history.push("/")
        })
        .catch(error=>{
            console.log(error.message)
            setPostingError(true)
        })

    }


    return (
            <div className="feed-item transparent">
                <div className='icon-container'>
                    {inIcon}
                </div>
                <div className='orders-feed-text'>
                    <div className="title font bold">{props.productname}</div>
                    <div className="shop-name font">{props.location}</div>
                </div>

                <div className="button-container">
                    <button className='round-button' onClick={incrementQuantity}>+</button>
                    <input type="number"
                           min="1"
                           name="quantity"
                           value={form.quantity}
                           onChange={(event)=>{changeHandler(event)}}>
                    </input>
                    <button className='round-button minus' onClick={decrementQuantity}>-</button>
                </div>

                <div className="send-container">
                    {object.role === "Manager" && <button className='button' onClick={(event)=>{submitHandlerManager(event)}}>{posting ? "..." : "Req"}</button>}
                    {object.role === "Admin" && <button className='button' onClick={(event)=>{submitHandler(event)}}>Stock</button>}
                </div>
            
            </div> 
            );
}
 
export default RequestItem;