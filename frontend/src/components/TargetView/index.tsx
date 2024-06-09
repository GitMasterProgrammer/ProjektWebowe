import Heading from "../Heading";
import { useEffect, useState  } from "react";
import {Target} from "../../interfaces/Target.tsx";
import LinkButton from "../LinkButton";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import FollowButton from "../FollowButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";

interface AuthUser {
    id: string; 
}

export default function TargetView() {
    const auth  = useAuthUser() as AuthUser;
    const [targets, setTargets] = useState<Target[]|null>(null)
    const [favourities, setFavourities] = useState<number[]|null>(null)
    // const [order, setOrder] = React.useState("likes_desc");
    const [quantity] = useState(25);
    const [name, setName] = useState('');

    const Refresh = ()=> {
        loadFavourites()

        const orderBy = 'likes_desc'
        const requestOptions = {
            method: 'GET'
        };
        if (name != "" && name != undefined) {
            const seachParams = new URLSearchParams({
                'name': name,
                'orderBy': orderBy,
                'maxRows': quantity.toString()
            })

            console.log('http://localhost:3000/api/target/get?' + seachParams)
            fetch('http://localhost:3000/api/target/get?' + seachParams, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setTargets(data.recordsLike)
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            const seachParams = new URLSearchParams({
                'orderBy': orderBy,
                'maxRows': quantity.toString()
            })
            console.log('http://localhost:3000/api/target/get?' + seachParams)
            fetch('http://localhost:3000/api/target/get?' + seachParams, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setTargets(data.recordsLike)
                    console.log(data.recordsLike)
                    console.log(targets)

                }).catch(error => {
                console.log(error)
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
                favs.map((fav : any) => {
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
            <form className="filterOptions form-inline">
                {/*
                <div className="form-group mr-2"> 
                    <label htmlFor="quantity">Liczba wyników:</label>
                    <select name="quantity" id="quantity" value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))} className="form-control">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                */}

                {/*<div className="form-group mr-2"> */}
                {/*    <label htmlFor="order">Order by:</label> */}
                {/*    <select name="order" id="order" value={order} onChange={(e) => setOrder(e.target.value)} className="form-control"> */}
                {/*        <option value="name_asc">Name ASC</option>*/}
                {/*        <option value="name_desc">Name DESC</option>*/}
                {/*        <option value="likes">Likes</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                <div className="form-group mr-2 w-100"> 
                    <input onChange={(e) => setName(e.target.value)} type="text" id="search"
                           name="search" className="form-control" placeholder="Szukaj..."/>
                </div>
                {/*<input type="reset" value="Wyczyść filtry" onClick={()=> {
                    setName('')
                    setQuantity(25)
                    Refresh()
                }} className="btn btn-secondary mr-2"/>*/}
                <button type="button" className="btn btn-primary btn-normal search-btn" onClick={Refresh}>Szukaj</button>
            </form>
            <div className="targetList">
                {targets?.map(target => {
                    const isFollowed = favourities?.includes(target.id);
                    return (
                    <div key={target.id} className="location card mb-3">
                        <div
                            className={"background-red-light actuality sec-font"}>{target.creator.name}</div>

                        <div className="card-body">
                            <Heading level={3} content={target.name} className="name-location"/>
                            <p className={'card-text'}>{target.description}</p>
                            <LinkButton href={'/targets/' + target.id} content={"Szczegóły"}
                                        icon={<FontAwesomeIcon icon={faArrowRight}/>} className="hover-link"/>

                            <FollowButton isFollowed={isFollowed ?? false} targetId={target.id}/>

                        </div>

                        <div className={'bottom-data'}>
                            <div className="card-text btm d-flex">
                                <span className={'icon w-100 d-space'}><a className={'font-weight-bold'}>Polubienia</a> <div
                                    className={''}><FontAwesomeIcon icon={faThumbsUp}/> {(target.likes).toFixed(2)}</div></span>
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    )
}