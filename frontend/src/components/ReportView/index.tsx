import Heading from "../Heading";
import React, { useEffect, useState } from "react";
import { Location } from "../../interfaces/Location.tsx";
import LinkButton from "../LinkButton";
import {fixData} from "../../helpers/fixDate.tsx";

export default function ReportView() {
    const [order, setOrder] = React.useState("createdAt_desc");
    const [quantity, setQuantity] = React.useState(25);
    const [lastHrs, setLastHrs] = React.useState(24);
    const [onlyActual, setActuality] = React.useState(true);
    const [locations, setLocations] = useState<Location[] | null>(null);

    // lastHrs
    const refresh = () => {
        const requestOptions = {
            method: 'GET'
        };
        const searchParams = new URLSearchParams({
            'orderBy': order,
            'actual': String(onlyActual),
            'maxRows': quantity.toString()
        });

        fetch('http://localhost:3000/api/location/get?' + searchParams, requestOptions)
            .then(response => response.json())
            .then(data => {
                setLocations(data.record);
            })
            .catch(error => {
                console.error('Error fetching locations:', error);
            });
    };
    const checkHandler = () => {
        setActuality(!onlyActual)
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <div className="ReportView container">
            <form method="post" className="filterOptions">
                <div className="form-group">
                    <label>Liczba zgłoszeń</label>
                    <select name="quantity" value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))} className="form-control">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Czas od zgłoszenia:</label>
                    <select name="quantity" value={lastHrs} onChange={(e) => setLastHrs(parseInt(e.target.value))}
                            className="form-control">
                        <option value="1">1 godzina</option>
                        <option value="2">2 godziny</option>
                        <option value="4">4 godziny</option>
                        <option value="6">6 godzin</option>
                        <option value="12">12 godzin</option>
                        <option value="24">1 dzień</option>
                        <option value="168">7 dni</option>

                    </select>
                </div>
                <div className="form-group">
                    <label>Sortuj po:</label>
                    <select name="order" value={order} onChange={(e) => setOrder(e.target.value)}
                            className="form-control">
                        <option value="createdAt_desc">Najnowsze</option>
                        <option value="rating_desc">Oceny</option>
                    </select>
                </div>
                <div className="form-group form-check">
                    <input checked={onlyActual} onChange={checkHandler} type="checkbox" name="actual"
                           className="form-check-input" id="actualCheck"/>
                    <label className="form-check-label" htmlFor="actualCheck">Tylko aktualne:</label>
                </div>
                <input type="reset" value="Wyczyść filtry" className="btn btn-secondary mr-2"/>
                <button type="button" className="btn btn-primary" onClick={refresh}>Filtruj</button>
            </form>
            <div className="reportList mt-4">
                {locations?.map(location => (
                    <div key={location.id} className="location card mb-3">
                        <div className="card-body">
                            <Heading level={3} content={location.target.name}/>
                            <p className="card-text">Adres: {location.address}</p>
                            <p className="card-text">Ocena: {location.rating}</p>
                            <p className="card-text">Zaktualizowano: {fixData(location.createdAt)}</p>
                            <p className="card-text">Aktualność: {location.actual ? "Jak najbardziej" : "no niezbyt"}</p> 
                            <LinkButton content={'Details'} href={`/reports/${location.id}`} className="btn btn-primary" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
