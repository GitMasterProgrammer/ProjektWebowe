import Heading from "../Heading";
import React, { useEffect, useState } from "react";
import { Location } from "../../interfaces/Location.tsx";
import LinkButton from "../LinkButton";

export default function ReportView() {
    const [order, setOrder] = React.useState("createdAt_desc");
    const [quantity, setQuantity] = React.useState(25);
    const [onlyActual, setActuality] = React.useState(true);
    const [locations, setLocations] = useState<Location[] | null>(null);

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
                    <label>Number of reports:</label>
                    <select name="quantity" value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))} className="form-control"> 
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="-1">ALL!!!!!!!!</option>
                    </select>
                </div>
                <div className="form-group"> 
                    <label>Order by:</label>
                    <select name="order" value={order} onChange={(e) => setOrder(e.target.value)} className="form-control"> 
                        <option value="createdAt_desc">Newest</option>
                        <option value="rating_desc">Rating</option>
                    </select>
                </div>
                <div className="form-group form-check"> 
                    <input value={onlyActual} onChange={checkHandler} type="checkbox" name="actual" className="form-check-input" id="actualCheck" />
                    <label className="form-check-label" htmlFor="actualCheck">Tylko aktualne:</label> 
                </div>
                <div className="form-group"> 
                    <label>Search:</label>
                    <input type="text" name="search" placeholder="Search..." className="form-control" /> 
                </div>
                <input type="reset" value="Reset filters" className="btn btn-secondary mr-2" /> 
                <button type="button" className="btn btn-primary" onClick={refresh}>Refresh</button> 
            </form>
            <div className="reportList mt-4"> 
                {locations?.map(location => (
                    <div key={location.id} className="location card mb-3"> 
                        <div className="card-body"> 
                            <Heading level={3} content={location.target.name} />
                            <p className="card-text">Adres: {location.address}</p> 
                            <p className="card-text">Rating: {location.rating}</p> 
                            <p className="card-text">Zaktualizowano: {location.createdAt?.toLocaleString()}</p> 
                            <p className="card-text">Aktualność: {location.actual ? "Jak najbardziej" : "no niezbyt"}</p> 
                            <LinkButton content={'Details'} href={`/reports/${location.id}`} className="btn btn-primary" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
