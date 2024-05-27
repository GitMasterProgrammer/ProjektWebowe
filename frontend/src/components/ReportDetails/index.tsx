import { Location } from "../../interfaces/Location.tsx";
import Heading from "../Heading";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ActualityButton from "../ActualityButton";

export default function ReportDetails() {
    const [reportData, setReportData] = useState<Location|null>(null)
    const { reportId  } = useParams();

    const auth = useAuthUser();

    useEffect(() => {
        const requestOptions = {
            method: 'GET'
        };
        const fetchUserData = async () => {
            try {
                // console.log('http://localhost:3000/api/location/get/' + reportId)
                const response = await fetch('http://localhost:3000/api/location/get/' + reportId, requestOptions);
                const rep_data = await response.json();
                console.log(rep_data)
                setReportData(rep_data.record);
            } catch (error) {
                console.error('Błąd podczas  danych:', error);
            }
        };
        console.log(auth)
        fetchUserData();
    }, []);
    if (reportData== null) {
        return (<p>Ten obiekt nie istnieje</p>)
    }
    return (
        <div className="reportDetails"> 
            <Heading content={reportData.target.name} level={2} />
            <p>Adres: {reportData.address}</p>
            <p>Aktualne: {reportData.actual ? "Tak" : "Nie"}</p>
            <p>Szczegóły: {reportData.details}</p>
            <p>Zgłaszający: {reportData.creator?.name} ({reportData.creator?.reliability})</p>
            {reportData.creator?.id === auth.id ?
                <ActualityButton reportId={parseInt(reportId)} isActive={reportData.actual} />
                :
                (
                    <div>
                        <button className="btn btn-primary">Oceń:</button>
                        <input type={"number"} name={"ocena"} value={0} className="form-control" /> 
                    </div>
                )
            }
        </div>
    )
}
