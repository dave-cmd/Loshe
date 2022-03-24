import { useEffect, useState } from "react"

const useFetch = (url) => {

    const[data, setData] = useState([])
    const[error, setError] = useState(null)

    useEffect(()=>{

        //Abort controller
        const abortController = new AbortController();

        //Fetch function
        fetch(url, { signal: abortController.signal })
        .then(res=>{
            if(!res.ok){
                throw Error("Fetch error occured in GET request.");
            }
            return res.json();
        })
        .then(data=>{
            setData(data);
        })
        .catch(e=>{
            setError(e.message);
        });

        //cleanup function to terminate the fetch request
        return abortController.abort();

    },[url]);

    return ( {data, error, setData} );``
}
 
export default useFetch;