import {useEffect, useState} from "react";
import {Target} from "../../interfaces/Target.tsx";
import {useParams} from "react-router-dom";

// interface TargetDetailsProps {
//     targetId: number
// }

export default function TargetDetails() {
    const [targetData, setTargetData] = useState<Target|null>(null)
    const { targetId  } = useParams();
    const reqData = {
        where: {
            id: targetId
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
                const response = await fetch('http://localhost:3000/api/get/target', requestOptions);
                const userData = await response.json();
                setTargetData(userData.record[0]);
            } catch (error) {
                console.error('Błąd podczas  danych:', error);
            }
        };

        fetchUserData();
    }, []);
    if (targetData== null) {
        return (<p>Ten obiekt nie istnieje</p>)
    }
    // TODO: polubienia
    return (
        <ul>
            <li>Nazwa: {targetData.name}</li>
            <li>Opis: {targetData.description}</li>
            <li>Twórca: {targetData.creator.name}</li>
            <li>Polubienia: {targetData.name}</li>
        </ul>
    )
}