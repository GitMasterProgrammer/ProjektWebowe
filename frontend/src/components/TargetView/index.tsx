import Heading from "../Heading";
import React, {useEffect} from "react";
import {Target} from "../../interfaces/Target.tsx";
import LinkButton from "../LinkButton";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FollowButton from "../FollowButton";

export default function TargetView() {
    const auth  = useAuthUser()
    const n: number[] = []
    const [targets, setTargets] = React.useState<Target[]|null>(null)
    const [favourities, setFavourities] = React.useState<number[]|null>(null)
    const [order, setOrder] = React.useState("name_asc");
    const [quantity, setQuantity] = React.useState(25);
    const [name, setName] = React.useState("");

    const Refresh = ()=> {
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
        if (name != "") {
            const seachParams = new URLSearchParams({
                'name': name,
                'orderBy': order,
                'maxRows': quantity.toString()
            })
            console.log('http://localhost:3000/api/target/get?' + seachParams)
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
                    setTargets(data.recordsLike)
                    console.log(data)
                });
        }
        console.log(targets)
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
        <div className="TargetView container"> 
            <form className="filterOptions form-inline"> 
                <div className="form-group mr-2"> 
                    <label htmlFor="quantity">Number of targets:</label> 
                    <select name="quantity" id="quantity" value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))} className="form-control"> 
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div className="form-group mr-2"> 
                    <label htmlFor="order">Order by:</label> 
                    <select name="order" id="order" value={order} onChange={(e) => setOrder(e.target.value)} className="form-control"> 
                        <option value="name_asc">Name ASC</option>
                        <option value="name_desc">Name DESC</option>
                        <option value="likes">Likes</option>
                    </select>
                </div>
                <div className="form-group mr-2"> 
                    <label htmlFor="search">Search:</label> 
                    <input onChange={(e) => setName(e.target.value)} type="text" id="search" name="search" className="form-control" placeholder="Search..."/> 
                </div>
                <input type="reset" value="Reset filters" className="btn btn-secondary mr-2"/> 
                <button type="button" className="btn btn-primary" onClick={Refresh}>Filter</button> 
            </form>
            <div className="targetList mt-4"> 
                {targets?.map(target => {
                    const isFollowed = favourities?.includes(target.id);
                    return (
                        <div key={target.id} className="target card mb-3"> 
                            <div className="card-body"> 
                                <Heading level={3} content={target.name}/>
                                <p className="card-text targetDesc">{target.description}</p> 
                                <p className="card-text">Likes: {target.likes}</p> 
                                <p className="card-text">Creator: {target.creator.name}</p> 
                                <FollowButton isFollowed={isFollowed??false} targetId={target.id}/>
                                <LinkButton href={'/targets/' + target.id} content={"More info"}/> 
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}