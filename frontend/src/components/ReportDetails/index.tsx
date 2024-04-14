import {Location} from "../../interfaces/Location.tsx";
import Heading from "../Heading";

export default function ReportDetails() {
    const location : Location =
    {
        id: 1,
        address: "Fredry 13",
        actual: true,
        details: "Potężny dyro czycha",
        rating: 5,
        creator: {
            id: 1,
            name: "Fredek",
            email: "fredry@gmail.com",
            reliability: 5.2,
            createdAt: new Date()
        },
        target: {
            id: 1,
            name: "Pyssa",
            description: "Potężny dyro",
            likes: 5
        },
        createdAt: new Date(),
        updatedAt: new Date()
    }

    return (
        <div className={"reportDetails"}>
            <Heading content={location.target.name} level={2}/>
            <p>Adres: {location.address}</p>
            <p>Aktualne: {location.actual?"Tak":"Nie"}</p>
            <p>Szczegóły: {location.details}</p>
            <p>Zgłaszający: {location.creator?.name} ({location.creator?.reliability})</p>
            {location.creator?.name ==="your"?
                <button>Edytur</button>
                :
                (
                    <div>
                        <button>Oceń:</button>
                        <input type={"number"} name={"ocena"} value={0}/>
                    </div>

                )
            }
        </div>
    )

}