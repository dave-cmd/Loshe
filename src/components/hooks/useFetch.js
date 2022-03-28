import {useState, useEffect} from "react"

const useFetch = (url)=>{
    const[data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=>{
        //Abort controller
        const abortController = new AbortController();

        setTimeout(()=>{
            fetch(url, { signal: abortController.signal })
                .then(res=>{
                    if(!res.ok) {
                        throw Error("Error, could not fetch data from that resource.") 
                    }
                    return res.json()
                })
                .then(data=>{
                    setData(data)
                })
                .catch(err=>{
                    if (err.name === "AbortError"){
                        console.log(err.name)
                    }
                    else {
                        setError(err.message)
                    }
                    
                })
        },0);
    return ()=>{
        console.log("cleanup invoked!!")
         return abortController.abort();
    }
    },[url])
    
    return {data, error, setData}
}

export default useFetch;