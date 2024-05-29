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
            <form method="post" onSubmit={OnSubmit} className="container"> 
                <div className="form-group"> 
                    <label htmlFor="name">Nazwa:</label>
                    <input required onChange={(e)=>setFormData({...formData, name: e.target.value})} type="text" name="name"
                        id="name" className="form-control" placeholder="name"/>
                </div>
                <div className="form-group"> 
                    <label htmlFor="description">Opis:</label>
                    <textarea required onChange={(e)=>setFormData({...formData, description: e.target.value})}
                            name="description" id="description" className="form-control" placeholder="description"></textarea> {/* Dodanie klas Bootstrapowych */}
                </div>
                <p className="text-danger">{error}</p> 
                <button type="submit" className="btn btn-primary">Utwórz osobę</button>
            </form>
        )

}