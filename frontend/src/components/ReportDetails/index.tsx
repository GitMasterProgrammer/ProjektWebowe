import { Location } from "../../interfaces/Location.tsx";
import Heading from "../Heading";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ActualityButton from "../ActualityButton";
import {Rating} from "@mui/material";
import {fixData} from "../../helpers/fixDate.tsx";
import LinkButton from "../LinkButton";

interface AuthUser {
    id: string; 
}

export default function ReportDetails() {
    const [reportData, setReportData] = useState<Location|null>(null)
    const [rating, setRating] = useState<number|null>(null)

    const { reportId  } = useParams();

    const auth = useAuthUser() as AuthUser;

    useEffect(() => {
        const requestOptions = {
            method: 'GET'
        };
        const fetchUserData =  () => {
            try {
                // console.log('http://localhost:3000/api/location/get/' + reportId)
                fetch('http://localhost:3000/api/location/get/' + reportId, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        setReportData(data.record);
                        if (data.record.creator?.id !== auth.id) {
                            const searchParams = new URLSearchParams({
                                'locationId': data.record.id.toString(),
                                'userId': auth.id,
                            });
                            fetch('http://localhost:3000/api/likedLocations/get?' + searchParams, requestOptions)
                                .then(response => response.json())
                                .then(record_data => {
                                    console.log(record_data);
                                    if (record_data.record[0] !== undefined) {
                                        setRating(record_data.record[0].value)
                                        console.log(record_data.record[0].value);
                                    }
                                })
                                .catch(error => {
                                    console.error('Error fetching locations:', error);
                                });
                        }

                    })
                    .catch(error => {
                        console.error('Error fetching locations:', error);
                    });
            } catch (error) {
                console.error('Błąd podczas  danych:', error);
            }
        };
        fetchUserData();
        console.log(auth)
    }, []);

    const updateRating = (newRating: number) => {
        console.log(newRating)
        if (rating == undefined) {
            const reqData = {
                value: newRating,
                userId: auth.id,
                locationId: parseInt(reportId as string)
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqData)
            };

            fetch('http://localhost:3000/api/likedLocations/post', requestOptions)
                .then(response => response.json())
                .then(() => {
                    console.log('success')
                })
                .catch(err => {
                    console.log(err.toString());
                });
        } else{
            const reqData = {
                value: newRating,
                userId: auth.id,
                locationId: parseInt(reportId as string)
            };

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqData)
            };

            fetch('http://localhost:3000/api/likedLocations/put', requestOptions)
                .then(response => response.json())
                .then(() => {
                    console.log('updated')
                })
                .catch(err => {
                    console.log(err.toString());
                });
        }
    }

    if (reportData== null) {
        return (<p>Ten obiekt nie istnieje</p>)
    }
    return (
        <div className="reportDetails container-center">
            <Heading content={reportData.target.name} level={2} className="header-yellow"/>
            <p>Ostatnio aktualizowane: {fixData(reportData.updatedAt)}</p>
            <p>Adres: {reportData.address}</p>
            <p>Średnia ocen: {reportData.rating}</p>
            <p>Aktualne: {reportData.actual ? "Tak" : "Nie"}</p>
            <p>Szczegóły: {reportData.details}</p>
            <p>Zgłaszający: {reportData.creator?.name} ({reportData.creator?.reliability})</p>
            {reportData.creator?.id === auth.id as any ?
                <ActualityButton reportId={parseInt(reportId as string)} isActive={reportData.actual}/>
                :
                (
                    <div className="d-flex">
                        <p>Oceń to zgłoszenie</p>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                console.log(event)
                                updateRating(newValue as number)
                                setRating(newValue ?? 0);
                            }}
                        />
                    </div>
                )
            }
            <LinkButton href={'/reports'} content={'Wróć'} />
        </div>
    )
}
