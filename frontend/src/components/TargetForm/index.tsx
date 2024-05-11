import React from "react";
import {useNavigate} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";


export default function TargetForm(){
    const [formData, setFormData] = React.useState({name: '', description: ''})
    const [error, setError] = React.useState("")
    const navigate = useNavigate ();
    const auth  = useAuthUser()


    const OnSubmit = (event ) => {
        event.preventDefault()
        const reqData = {
            name: formData.name,
            description: formData.description,
            creator: {
                connect: {
                    id: auth.id
                }
            }
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqData)
        };
        console.log(JSON.stringify(reqData))
        fetch('http://localhost:3000/api/target/post', requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/targets')
            })
            .catch(err=>{setError(err)})
    }
    return (
            <form method="post" onSubmit={OnSubmit}>
                <label>Name:</label>
                <input required onChange={(e)=>setFormData({...formData, name: e.target.value})} type="text" name="name"
                       placeholder="name"/>
                <label>Description:</label>
                <textarea required onChange={(e)=>setFormData({...formData, description: e.target.value})}
                          name="description" placeholder="description"></textarea>
                <p>{error}</p>
                <button type="submit">Utwórz osobę</button>
            </form>

        )

}