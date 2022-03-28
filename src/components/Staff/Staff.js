import useFetch from "../hooks/useFetch";
import { useState } from "react";
import "./Staff.css"

const Staff = () => {
    const{data, error} = useFetch("/api/getStaff")
    const elements = data.map(elem =>{
        return <div 
            key={elem.id}
            className="staff-element"
        >{elem.firstname}</div>
    })
    return ( 
        <div className="wrapper-staff">
            <h1 className="staff-title">Staff</h1>
            <div className="staff-list">
                {elements}
            </div>
        </div>
     );
}
 
export default Staff;