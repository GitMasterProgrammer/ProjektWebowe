import React, {ChangeEventHandler, useEffect, useState} from "react";
import {Target} from "../../interfaces/Target.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FindTarget from "../FindTarget";
import {useNavigate} from "react-router-dom";


export default function ReportForm(){
    const navigate = useNavigate ();
    const auth  = useAuthUser()
    const [favourities, setFavourities] = React.useState<Target[]|null>(null)
    const [targetId, setTargetId] = useState(-1)
    const [formData, setFormData] = React.useState({address: '', coordinates: '', details: ''})
    const [errors, setError] = React.useState("")


    const loadFavourites = () => {
        const reqOptions = {
            method: 'GET',
        };
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
                console.log(err)
                setFavourities(err)
            })
    }

    //TODO: ten widok
    const  OnSubmit = (event ) => {
        event.preventDefault()
        if (formData.address == null || formData.address == '') {
            setError( "Please enter valid address")
            return
        }
        else if (targetId < 1){
            setError("Please select a target")
            return
        }
        const reqData = {
            coordinates: formData.coordinates,
            address: formData.address,
            details: formData.details,
            creator: {
                connect: {
                    id: auth.id
                }
            },
            target:{
                connect: {
                    id: targetId
                }
            }
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqData)
        };
        console.log(JSON.stringify(reqData))
        fetch('http://localhost:3000/api/location/post', requestOptions)
            .then(response => response.json())
            .then(data => {
                navigate('/reports')
            })
            .catch(err=>{setError(err)})
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
            <FindTarget setValue={setTargetId}/>
            <select name="targetId" value={targetId} onChange={(e) => setTargetId(parseInt(e.target.value))}>
                {
                    favourities?.map(target =>
                        (<option key={target.id} value={target.id}>{target.name}</option>)
                    )
                }

            </select>
            <p>{targetId}</p>
            <label>Address:</label>
            <input required onChange={(e) => setFormData({...formData, address: e.target.value})}
                   type="text" name="address" placeholder="address"/>
            <label>Coordinates:</label>
            <input onChange={(e) => setFormData({...formData, coordinates: e.target.value})}
                   type="text" name="coordinates"/>
            <label>Datails:</label>
            <textarea required onChange={(e) => setFormData({...formData, details: e.target.value})}
                      name="datails"></textarea>
            <p>{errors}</p>
            <button type="submit">Utwórz osobę</button>

        </form>

    )
}