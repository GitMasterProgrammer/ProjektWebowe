import Heading from "../Heading";
import React from "react";
import {Target} from "../../interfaces/Target.tsx";

export default function TargetView() {

    const t: Target[] = []
    const [targets, setTargets] = React.useState(t)
    const [order, setOrder] = React.useState("name_asc");
    const [quantity, setQuantity] = React.useState(25);
    const [name, setName] = React.useState("");

    const Refresh = (e)=> {
        const where = {
            name: {
                contains: name
            }
        }
        const orderBy = [{
            name: "asc"
        }];
        switch (order){
            case "likes":
                orderBy.push({
                    likes: "desc"
                })
                break
            case "name_desc":
                orderBy.name = "name_desc";
        }
        const body = {
            where: where,
            orderBy: orderBy,
            maxRows: quantity
        }
        console.log(body)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        fetch('http://localhost:3000/api/get/target', requestOptions)
            .then(response => response.json())
            .then(data => {
                setTargets(data.record)
                console.log(data)

            });
    }
    return (
        <div className="TargetView">
            <form className="filterOptions">
                <label>Numer of targets</label>
                <select name="quantity" value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <label>Order by</label>
                <select name="order" value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="name_asc">Name ASC</option>
                    <option value="name_desc">Name DESC</option>
                    <option value="likes">Likes</option>
                </select>
                <label>Search:</label>
                <input onChange={(e) => setName(parseInt(e.target.value))}
                       type="text" name="search" placeholder="Search..."/>

                <input type="reset" value="Reset filters"/>
            </form>
            <button onClick={Refresh}>Filter</button>
            <div className="targetList">
                {targets.sort((targetA, targetB) => {
                        if (order === "name_asc")
                            return targetA.name.localeCompare(targetB.name)
                        else if (order === "name_desc")
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