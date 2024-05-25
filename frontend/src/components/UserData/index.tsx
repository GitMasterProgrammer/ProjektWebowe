import {User} from "../../interfaces/User.tsx";
import {useEffect, useState} from "react";


interface UserDataProps {
    userId: number
}
export default function UserData({userId} : UserDataProps) {
    const [user_data, setUserData] = useState<User|null>(null)
    const requestOptions = {
        method: 'GET'
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/user/get/' + userId, requestOptions);
                const userData = await response.json();
                // console.log(userData)
                setUserData(userData.user);
            } catch (error) {
                console.error('Błąd podczas pobierania danych użytkownika:', error);
            }
        };

        fetchUserData();
    }, []);
    if (user_data== null) {
        return (<p>brak</p>)
    }
    return (
            <ul>
                <li>Username: {user_data.name}</li>
                <li>Email: {user_data.email}</li>
                <li>Created at: {user_data.createdAt}</li>
                <li>Reliability: {user_data.reliability}</li>
            </ul>
        )
}