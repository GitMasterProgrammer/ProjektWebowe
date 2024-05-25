import React, {ChangeEventHandler, useEffect, useState} from "react";
import {Target} from "../../interfaces/Target.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FindTarget from "../FindTarget";


export default function ReportForm(){
    const t:Target[] = [];

    const auth  = useAuthUser()
    const [favourities, setFavourities] = React.useState(t)
    const [targetId, setTargetId] = useState(-1)
    const reqOptions = {
        method: 'GET',
    };
    const loadFavourites = () => {
        fetch('http://localhost:3000/api/user/get/likedTargets/' + auth.id , reqOptions)
            .then(response => response.json())
            .then(data => {
                const favs : Target[] = [];
                data.record.favourites.map((relation) => {
                    favs.push(relation.target)
                })
                console.log(favs)

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
    }, [])
//TODO selecting target
    return (
            <form method="post" onSubmit={OnSubmit}>
                <label>Wybierz osobę której pozycje zgłaszasz (z twoich polubionych):</label>
                {/*<input required onChange={(e)=>setFormData({...formData, target: e.target.value})}*/}
                {/*       type="text" name="target" placeholder="Target's name"/>*/}
                <FindTarget setValue={setTargetId} />
                <select name="targetId">
                    {
                        favourities.map(target =>
                            (<option key={target.id} value={target.id}>{target.name}</option>)
                        )
                    }

                </select>
                <p>{targetId}</p>
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
            </form>

        )
}