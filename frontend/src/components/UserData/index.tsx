import {User} from "../../interfaces/User.tsx";
import {useEffect, useState} from "react";
import {fixData} from "../../helpers/fixDate.tsx";

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
            <div className="box-round-container">
                <li className="list-group-item">Nazwa użytkownika: {user_data.name}</li>
                <li className="list-group-item">Email: {user_data.email}</li> 
                <li className="list-group-item">Utworzone: {fixData(user_data.createdAt)}</li>
                <li className="list-group-item">Zaufanie: {user_data.reliability}</li>
            </div>
        )
}