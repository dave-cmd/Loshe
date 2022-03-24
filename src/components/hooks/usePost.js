import { useEffect, useState } from "react";

const usePost = (payload, url) => {

    const [res, setRes] = useState(null);
    const [error, setError] = useState(null);

    //Post form data
    useEffect(()=>{
        //Abort controller
        const abortController = new AbortController();

        //Post data
        fetch(url, { signal : abortController.signal },{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        .then(res=>{
            if(!res.ok){
                throw Error("Error posting data!");
            }
            setRes(res.ok);
            return res.json();
        })
        .then(data=>{
            console.log(data);
        })
        .catch(err=>{
            setError(err.message);
            console.log(error);
        });
        //cleanup function to terminate the fetch request
        return abortController.abort();
    },[payload, url]);
    return ( res, error );
}

export default usePost;