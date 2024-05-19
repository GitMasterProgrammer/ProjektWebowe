import React, {ChangeEventHandler, useEffect} from "react";
import {Target} from "../../interfaces/Target.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";


export default function ReportForm(){
    const t:Target[] = [];

    const auth  = useAuthUser()
    const [favourities, setFavourities] = React.useState(t)

    const reqOptions = {
        method: 'GET',
    };
    const loadFavourites = () => {
        fetch('http://localhost:3000/api/user/get/likedTargets/' + auth.id , reqOptions)
            .then(response => response.json())
            .then(data => {
                const favs = data.record.favourites
                setFavourities(favs)
            })
            .catch(err=>{
                console.log(err)})
    }
    const [formData, setFormData] = React.useState({target: '', coordinates: '', details: ''})
    const [errors, setErrors] = React.useState("")
    //TODO: ten widok
    const  OnSubmit = (event ) => {
        event.preventDefault()
    }
    useEffect(()=>{
        loadFavourites()
    })

    return (
            <form method="post" onSubmit={OnSubmit}>
                <label>Target (Write name or select from list):</label>
                <input required onChange={(e)=>setFormData({...formData, target: e.target.value})}
                       type="text" name="target" placeholder="Target's name"/>
                <select name="targetId">
                    {
                        favourities.map(target =>
                            (<option value={target.id}>{target.name}</option>)
                        )
                    }

                </select>
                <label>Address:</label>
                <input required onChange={(e)=>setFormData({...formData, target: e.target.value})}
                       type="text" name="address" placeholder="address"/>
                <label>Coordinates:</label>
                <input onChange={(e)=>setFormData({...formData, coordinates: e.target.value})}
                       type="text" name="coordinates"/>
                <label>Datails:</label>
                <textarea required onChange={(e)=>setFormData({...formData, details: e.target.value})}
                       name="datails"></textarea>
                <p>{errors}</p>
                <button type="submit">Zgłoś</button>
                {/*<p>Masz już konto? <a href={'/register'}>Zaloguj się</a></p>*/}
            </form>

        )
}