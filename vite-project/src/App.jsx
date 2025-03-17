import axios from 'axios';
import { useState, useEffect} from 'react'

export default function App(){
    const [tovar, setTovar] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:5000/api/tovar')
        .then(response => setTovar(response.data))
        .catch(error => console.error(error));
    }, []);
    return(
        <>
            {tovar.map((tovarz,index) => (
                <div key={index}>
                    <p>{tovarz.id_tovar}</p>
                    <p>{tovarz.tovar}</p>
                    <p>{tovarz.tovar123}</p>
                </div>
            ))}
        </>
    )
}