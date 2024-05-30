import { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface FollowButtonProps {
    targetId: number;
    isFollowed: boolean;
}

interface AuthUser {
    id: string; 
}


export default function FollowButton({ targetId, isFollowed }: FollowButtonProps) {
    const auth = useAuthUser() as AuthUser;
    const [isFollowing, setFollowing] = useState(isFollowed);

    const Follow = () => {
        const reqData = {
            targetId: targetId,
            userId: auth.id
        };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqData)
        };
        console.log(JSON.stringify(reqData));
        fetch('http://localhost:3000/api/favourites/', requestOptions)
            .then(response => response.json())
            .then(() => {
                setFollowing(true);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const UnFollow = () => {
        const seachParams = new URLSearchParams({
            'targetId': targetId.toString(),
            'userId': auth.id.toString()
        });
        const requestOptions = {
            method: 'DELETE',
        };
        console.log(seachParams);
        fetch('http://localhost:3000/api/favourites?' + seachParams, requestOptions)
            .then(response => response.json())
            .then(() => {
                setFollowing(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <button className={`btn btn-secondary search-button-non-primary border-radius-max ${isFollowing ? "btn-danger" : "btn-primary"}`} onClick={isFollowing ? UnFollow : Follow}>
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
    );
}
