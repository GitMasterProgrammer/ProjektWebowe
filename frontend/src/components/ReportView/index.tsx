import Heading from "../Heading";
import React, {useEffect, useState} from "react";
import {Target} from "../../interfaces/Target.tsx";
import {Location} from "../../interfaces/Location.tsx";
import LinkButton from "../LinkButton";

export default function ReportView() {
    const [order, setOrder] = React.useState("createdAt_desc");
    const [quantity, setQuantity] = React.useState(25);
    const [locations, setLocations] = useState<Location[]|null>(null)
    const Refresh = ()=> {
        const requestOptions = {
            method: 'GET'
        };
        if (true) { //TODO: napraw kiedy będzie wyszukiwanie po target name
            const seachParams = new URLSearchParams({
                'orderBy': order,
                'maxRows': quantity.toString()
            })
            console.log('http://localhost:3000/api/location/get?' + seachParams)
            fetch('http://localhost:3000/api/location/get?' + seachParams, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLocations(data.record)
                });
        } else {
            const seachParams = new URLSearchParams({
                'orderBy': order,
                'maxRows': quantity.toString()
            })
            fetch('http://localhost:3000/api/location/get?' + seachParams, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setLocations(data.record)
                });
        }
        console.log(locations)
    }
    useEffect(() => {
        Refresh()
    }, []);
    return (
        <div className="ReportView">
            <form method="post" className="filterOptions">
                <label>Numer of reports</label>
                <select name="quantity" value={quantity}
                        onChange={(e)=> setQuantity(parseInt(e.target.value))}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="-1">ALL!!!!!!!!</option>
                </select>
                <label>Order by</label>
                <select name="order" value={order} onChange={(e)=> setOrder(e.target.value)}>
                    <option value="createdAt_desc">Newest</option>
                    <option value="rating_desc">Rating</option>
                </select>
                <label>Tylko aktualne:</label>
                <input type="checkbox" name="actual"/>
                <label>Search:</label>
                <input type="text" name="search" placeholder="Search..." />

                <input type="reset" value="Reset filters"/>
            </form>
            <button>Refresh</button>
            <div className="reportList">
                {locations?.map(location => (
                        <div key={location.id} className="location">
                            <Heading level={3} content={location.target.name}/>
                            <p>Adres: {location.address}</p>
                            <p>Rating: {location.rating}</p>
                            <p>Zaktualizowano: {location.createdAt?.toLocaleString()}</p>
                            <p>Aktualność: {location.actual ? "Jak najbardziej" : "no niezbyt"}</p>
                            <LinkButton content={'Details'} href={`/${location.id}`}/>
                        </div>
                    ))}
            </div>
        </div>

    )
}