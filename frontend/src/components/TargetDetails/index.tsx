import {useEffect, useState} from "react";
import {Target} from "../../interfaces/Target.tsx";
import {useParams} from "react-router-dom";
import LinkButton from "../LinkButton";
import Heading from "../Heading";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";

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
        <div className="TargetDetails container-center dotted-back">
            <div className={'box-container-target'}>
                <div className={'border-radius-max author-top'}>
                    {targetData.creator.name}
                </div>
                <Heading content={targetData.name} level={2} className="title-h2"/>
                <li className="list-group-item">{targetData.description}</li>

                <span className={'icon d-space gap-2 mb-3'}><a className={'font-weight-bold'}>Polubienia</a> <div
                    className={''}><FontAwesomeIcon icon={faThumbsUp}/> {(targetData.countLikedUsers)}</div></span>
                <LinkButton href={'/targets'} content={'Wróć'} className={'btn btn-primary btn-normal color-white'}/>
            </div>
        </div>
    );
}
