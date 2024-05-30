import Heading from "../Heading";
import React, { useEffect, useState } from "react";
import { Location } from "../../interfaces/Location.tsx";
import LinkButton from "../LinkButton";
/*import {fixData} from "../../helpers/fixDate.tsx";*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function ReportView() {
    const [order, setOrder] = React.useState("createdAt_desc");
    const [quantity/*, setQuantity*/] = React.useState(25);
    const [lastHrs, setLastHrs] = React.useState(24);
    const [onlyActual, setActuality] = React.useState(true);
    const [locations, setLocations] = useState<Location[] | null>(null);
    const [showFilters, setShowFilters] = useState(false); // New state for showing/hiding filters

    const refresh = () => {
        console.log("fdfd")
        const requestOptions = {
            method: 'GET'
        };
        const searchParams = new URLSearchParams({
            'orderBy': order,
            'actual': String(onlyActual),
            'maxRows': quantity.toString()
        });

        console.log('http://localhost:3000/api/location/get?' + searchParams, requestOptions)

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
        <div className="ReportView">
            <button className={'btn btn-secondary search-button-non-primary border-radius-max'} onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? "Ukryj filtry" : "Pokaż filtry"}
            </button>

            {showFilters && (
                <form method="post" className="filterOptions">
                    {/*<div className="form-group">
                    <label>Liczba zgłoszeń</label>
                    <select name="quantity" value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))} className="form-control">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>*/}
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
                        <label className="form-check-label" htmlFor="actualCheck">Tylko aktualne</label>
                    </div>

                    <div className={"d-flex gap-2"}>
                        <input type="reset" value="Wyczyść filtry"
                               className="btn btn-secondary search-button-non-primary border-radius-max"/>
                        <button type="button" className="btn btn-primary btn-normal border-radius-max"
                                onClick={refresh}>Filtruj
                        </button>
                    </div>
                </form>
            )}


            <div className="reportList mt-5 d-flex gap-3 flex-wrap">
                {locations?.map(location => (
                    <div key={location.id} className="location card mb-3">
                        <div className="card-body">
                            <Heading level={3} content={location.target.name} className="name-location"/>
                            {/*<p className="card-text">Adres: {location.address}</p>*/}
                            <div className="card-text rating">
                                <div className="big">{(location.rating).toFixed(2)}</div>
                                <div className="small">rating</div>
                            </div>
                            {/*<p className="card-text">Zaktualizowano: {fixData(location.createdAt)}</p>*/}
                            {/*<p className="card-text">Aktualność: {location.actual ? "Jak najbardziej" : "no niezbyt"}</p>*/}
                            <LinkButton content={'Details'} href={`/reports/${location.id}`}
                                        icon={<FontAwesomeIcon icon={faArrowRight}/>} className="text-light"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
