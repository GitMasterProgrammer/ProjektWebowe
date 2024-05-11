import Heading from "../Heading";
import React from "react";
import {Target} from "../../interfaces/Target.tsx";
import {Location} from "../../interfaces/Location.tsx";
import LinkButton from "../LinkButton";

export default function ReportView() {
    // fetch tagets and locations
    const targets : Target[] = [
        {
            id: 1,
            name: "Pyssa",
            description: "Potężny dyro",

            likes: 5
        },
        {
            id: 3,
            name: "AAA",
            description: "Potężny dyro",
            likes: 523
        },
        {
            id: 5,
            name: "ZZZ",
            description: "Potężny dyro",
            likes: 0
        },
        {
            id: 2,
            name: "Pyssa4",
            description: "Potężny dyro",
            likes: 66
        },
    ]
    const locations : Location[] = [
        {
            id: 1,
            address: "Fredry 13",
            actual: true,
            details: "Potężny dyro czycha",
            rating: 5,
            target: targets[0],
            createdAt: new Date()
        },
        {
            id: 2,
            address: "Fredry 13",
            actual: true,
            details: "Bla blabla dyro czycha",
            rating: 1,
            target: targets[1],
            createdAt: new Date(2022, 11,12)
        },
        {
            id: 3,
            address: "Fredry 13",
            actual: true,
            details: "Potężny dyro czycha",
            rating: 3,
            target: targets[2],
            createdAt: new Date(2022, 11,11)
        },
        {
            id: 4,
            address: "Fredry 13",
            actual: false,
            details: "Potężny dyro czycha",
            rating: 5,
            target: targets[3],
            createdAt: new Date(2023, 11,11)
        },
    ]
    // TODO: ten wikod
    const [order, setOrder] = React.useState("likes");
    const [quantity, setQuantity] = React.useState(25);

    return (
        <div className="ReportView">
            <form method="post" className="filterOptions">
                <label>Numer of targets</label>
                <select name="quantity" value={quantity}
                        onChange={(e)=> setQuantity(parseInt(e.target.value))}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="-1">ALL!!!!!!!!</option>
                </select>
                <label>Order by</label>
                <select name="order" value={order} onChange={(e)=> setOrder(e.target.value)}>
                    <option value="newest">Newest</option>
                    <option value="rating">Rating</option>
                </select>
                <label>Tylko aktualne:</label>
                <input type="checkbox" name="actual"/>
                <label>Search:</label>
                <input type="text" name="search" placeholder="Search..." />

                <input type="reset" value="Reset filters"/>
            </form>
            <div className="targetList">
                {locations
                    .map(location => (
                        <div key={location.id} className="target">
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