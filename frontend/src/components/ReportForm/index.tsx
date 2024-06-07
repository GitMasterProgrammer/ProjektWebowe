import { useEffect, useState } from "react";
import { Target } from "../../interfaces/Target.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FindTarget from "../FindTarget";
import { useNavigate } from "react-router-dom";

interface AuthUser {
    id: string; 
}

export default function ReportForm() {
    const navigate = useNavigate();
    const auth = useAuthUser() as AuthUser;
    const [favourites, setFavourites] = useState<Target[] | null>(null);
    const [targetId, setTargetId] = useState(-1);
    const [formData, setFormData] = useState({ address: '', coordinates: '', details: '' });
    const [errors, setError] = useState("");

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
            .catch(() => {
                setFavourites(null);
            });
    };

    const onSubmit = (event : any) => {
        event.preventDefault();

        if (formData.address === '' || formData.address === null) {
            return setError("Please enter a valid address");

        } else if (targetId < 1) {
            return setError("Please select a target");

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
                console.log(err.toString())
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
                <label>Osoba którą pozycję zgłaszasz:</label>
                <FindTarget setValue={setTargetId} />
                <select data-testid={'select-fav'} name="targetId" value={targetId} onChange={(e) => setTargetId(parseInt(e.target.value))} className="form-control">
                    <option value={-1}>Wybierz...</option>
                    {
                        favourites?.map(target =>
                            (<option key={target.id} value={target.id}>{target.name}</option>)
                        )
                    }
                </select>
            </div>
            <div className="form-group"> 
                <label  htmlFor={'address'}>Adres:</label>
                <input required onChange={(e) => setFormData({ ...formData, address: e.target.value })} type="text" name="address" className="form-control" placeholder="adres" /> 
            </div>
            <div className="form-group"> 
                <label  htmlFor={'coordinates'}>Koordynaty:</label>
                <input value={formData.coordinates} onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })} type="text" name="coordinates" className="form-control" />
            </div>
            <div className="form-group"> 
                <label htmlFor={'details'}>Szczegóły:</label>
                <textarea required onChange={(e) => setFormData({ ...formData, details: e.target.value })} name="details" id={'details'} className="form-control"></textarea>
            </div>
            <p className="text-danger">{errors}</p> 
            <button type="submit" className="btn btn-primary btn-normal border-radius-max w-100">Utwórz raport</button>
        </form>
    );
}
