import Heading from "../Heading";
import React, {useEffect} from "react";
import {Target} from "../../interfaces/Target.tsx";
import LinkButton from "../LinkButton";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FollowButton from "../FollowButton";

export default function TargetView() {
    const auth  = useAuthUser()
    const t: Target[] = []
    const n: number[] = []
    const [targets, setTargets] = React.useState(t)
    const [favourities, setFavourities] = React.useState(n)
    const [order, setOrder] = React.useState("name_asc");
    const [quantity, setQuantity] = React.useState(25);
    const [name, setName] = React.useState("");

    const Refresh = ()=> {
        // const where = {
        //     name: {
        //         contains: name
        //     }
        // }
        loadFavourites()

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
        // const body = {
        //     name: name,
        //     orderBy: orderBy,
        //     maxRows: quantity
        // }
        const requestOptions = {
            method: 'GET'
        };
        if (name !== "") {
            const seachParams = new URLSearchParams({
                'name': name,
                'orderBy': order,
                'maxRows': quantity.toString()
            })
            fetch('http://localhost:3000/api/target/get?' + seachParams, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setTargets(data.record)
                });
        } else {
            const seachParams = new URLSearchParams({
                'orderBy': order,
                'maxRows': quantity.toString()
            })
            fetch('http://localhost:3000/api/target/get?' + seachParams, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setTargets(data.record)
                });
        }
    }
    const reqOptions = {
        method: 'GET',
    };
    const loadFavourites = () => {
        fetch('http://localhost:3000/api/user/get/likedTargets/' + auth.id , reqOptions)
            .then(response => response.json())
            .then(data => {
                const favouritesIds: number[] = []
                const favs = data.record.favourites
                favs.map((fav) => {
                    favouritesIds.push(fav.targetId)
                })
                setFavourities(favouritesIds)
            })
            .catch(err=>{
                console.log(err)})
    }
    
    useEffect(() => {
        Refresh();
    }, []);

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
                    .map(target => {
                        const isFollowed = favourities.includes(target.id);
                        return (
                            <div key={target.id} className="target">
                                <Heading level={3} content={target.name}/>
                                <p className="targetDesc">{target.description}</p>
                                <p>Likes: {target.likes}</p>
                                <p>Creator: {target.creator.name}</p>
                                <FollowButton isFollowed={isFollowed} targetId={target.id}/>
                                <LinkButton href={'/targets/' + target.id} content={"More info"} />
                            </div>
                        )
                    })}
            </div>
        </div>

    )
}