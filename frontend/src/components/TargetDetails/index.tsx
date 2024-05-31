import {useEffect, useState} from "react";
import {Target} from "../../interfaces/Target.tsx";
import {useParams} from "react-router-dom";
import LinkButton from "../LinkButton";

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
                console.log('http://localhost:3000/api/target/get/' + targetId)
                const response = await fetch('http://localhost:3000/api/target/get/' + targetId, requestOptions);
                const target_data = await response.json();
                console.log(target_data)
                setTargetData(target_data.target);
            } catch (error) {
                console.error('Błąd podczas  danych:', error);
            }
        };

        fetchUserData();
    }, []);
    if (targetData== null) {
        return (<p>Ten obiekt nie istnieje</p>)
    }

    return (
        <div className="TargetDetails container"> 
            <ul className="list-group"> 
                <li className="list-group-item">Nazwa: {targetData.name}</li>
                <li className="list-group-item">Opis: {targetData.description}</li>
                <li className="list-group-item">Twórca: {targetData.creator.name}</li>
                <li className="list-group-item">Polubienia: {targetData.countLikedUsers}</li>
            </ul>
            <LinkButton href={'/targets'} content={'Wróć'} />
        </div>
    );
}
