import {useEffect, useState} from "react";
import {Target} from "../../interfaces/Target.tsx";
import {useParams} from "react-router-dom";

// interface TargetDetailsProps {
//     targetId: number
// }

export default function TargetDetails() {
    const [targetData, setTargetData] = useState<Target|null>(null)
    const { targetId  } = useParams();

    const requestOptions = {
        method: 'GET'
    };

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/target/get/' + targetId, requestOptions);
                const userData = await response.json();
                setTargetData(userData.record);
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