import Heading from "../Heading";
import React from "react";
import {Target} from "../../interfaces/Target.tsx";

export default function TargetView() {
    // fetch tagets
    const targets_t : Target[] = [
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
    const [targets, setTargets] = React.useState(targets_t)
    const [order, setOrder] = React.useState("likes");
    const [quantity, setQuantity] = React.useState(25);

    

    return (
        <div className="TargetView">
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
                    <option value="name_asc">Name ASC</option>
                    <option value="name_desc">Name DESC</option>
                    <option value="likes">Likes</option>
                </select>
                <label>Search:</label>
                <input type="text" name="search" placeholder="Search..." />

                <input type="reset" value="Reset filters"/>
            </form>
            <div className="targetList">
                {targets.sort((targetA, targetB)=> {
                        if (order === "name_asc")
                            return targetA.name.localeCompare(targetB.name)
                        else  if (order === "name_desc")
                            return targetB.name.localeCompare(targetA.name)
                        else
                            return targetA.likes < targetB.likes
                    }
                )
                    .map(target => (
                    <div key={target.id} className="target">
                        <Heading level={3} content={target.name}/>
                        <p className="targetDesc">{target.description}</p>
                        <p>Likes: {target.likes}</p>
                        <button>Follow</button>
                    </div>
                ))}
            </div>
        </div>

    )
}