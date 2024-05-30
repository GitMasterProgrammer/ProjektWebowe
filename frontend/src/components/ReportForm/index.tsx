import React, { useEffect, useState } from "react";
import { Target } from "../../interfaces/Target.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FindTarget from "../FindTarget";
import { useNavigate } from "react-router-dom";

export default function ReportForm() {
    const navigate = useNavigate();
    const auth = useAuthUser()
    const [favourites, setFavourites] = React.useState<Target[] | null>(null);
    const [targetId, setTargetId] = useState(-1);
    const [formData, setFormData] = React.useState({ address: '', coordinates: '', details: '' });
    const [errors, setError] = React.useState("");

    const loadFavourites = () => {
        const reqOptions = {
            method: 'GET',
        };
        fetch('http://localhost:3000/api/user/get/likedTargets/' + auth.id, reqOptions)
            .then(response => response.json())
            .then(data => {
                const favs: Target[] = data.record.favourites.map((relation : any) => relation.target);
                setFavourites(favs);
            })
            .catch(err => {
                console.log(err);
                setFavourites(null);
            });
    };

    const onSubmit = (event : any) => {
        event.preventDefault();
        if (formData.address === '' || formData.address === null) {
            setError("Please enter a valid address");
            return;
        } else if (targetId < 1) {
            setError("Please select a target");
            return;
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
            target: {
                connect: {
                    id: targetId
                }
            }
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqData)
        };

        fetch('http://localhost:3000/api/location/post', requestOptions)
            .then(response => response.json())
            .then(/*data*/() => {
                navigate('/reports');
            })
            .catch(err => {
                setError(err.toString());
            });
    };

    useEffect(() => {
        loadFavourites();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                setFormData({...formData, coordinates: latitude + ', '+  longitude});
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }, []);


    return (
        <form method="post" onSubmit={onSubmit} className="needs-validation"> 
            <div className="form-group"> 
                <label>Wybierz osobę, której pozycję zgłaszasz (z twoich polubionych):</label>
                <FindTarget setValue={setTargetId} />
                <select name="targetId" value={targetId} onChange={(e) => setTargetId(parseInt(e.target.value))} className="form-control"> 
                    <option value={-1}>Wybierz...</option>
                    {
                        favourites?.map(target =>
                            (<option key={target.id} value={target.id}>{target.name}</option>)
                        )
                    }
                </select>
            </div>
            <div className="form-group"> 
                <label>Adres:</label>
                <input required onChange={(e) => setFormData({ ...formData, address: e.target.value })} type="text" name="address" className="form-control" placeholder="adres" /> 
            </div>
            <div className="form-group"> 
                <label>Koordynaty:</label>
                <input value={formData.coordinates} onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })} type="text" name="coordinates" className="form-control" />
            </div>
            <div className="form-group"> 
                <label>Szczegóły:</label>
                <textarea required onChange={(e) => setFormData({ ...formData, details: e.target.value })} name="details" className="form-control"></textarea> 
            </div>
            <p className="text-danger">{errors}</p> 
            <button type="submit" className="btn btn-primary">Utwórz raport</button>
        </form>
    );
}
