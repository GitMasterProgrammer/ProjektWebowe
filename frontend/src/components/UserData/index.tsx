import {User} from "../../interfaces/User.tsx";
import {useEffect, useState} from "react";


interface UserDataProps {
    userId: number
}
export default function UserData({userId} : UserDataProps) {
    const [user_data, setUserData] = useState<User|null>(null)
    const reqData = {
        where: {
            id: userId
        }
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqData)
    };

    useEffect(() => {
        console.log(JSON.stringify(reqData))

        const fetchUserData = async () => {
            try {
                // Tutaj możesz wywołać swoje API, aby pobrać dane użytkownika z bazy
                const response = await fetch('http://localhost:3000/api/get/user', requestOptions);
                const userData = await response.json();
                setUserData(userData.record[0]);
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