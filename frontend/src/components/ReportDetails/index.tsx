import { Location } from "../../interfaces/Location.tsx";
import Heading from "../Heading";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ActualityButton from "../ActualityButton";
import {Rating} from "@mui/material";
import {fixData} from "../../helpers/fixDate.tsx";

export default function ReportDetails() {
    const [reportData, setReportData] = useState<Location|null>(null)
    const [rating, setRating] = useState<number|null>(null)

    const { reportId  } = useParams();

    const auth = useAuthUser();

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
                locationId: parseInt(reportId)
            };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqData)
            };

            fetch('http://localhost:3000/api/likedLocations/post', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log('success')
                })
                .catch(err => {
                    console.log(err.toString());
                });
        } else{
            const reqData = {
                value: newRating,
                userId: auth.id,
                locationId: parseInt(reportId)
            };

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqData)
            };

            fetch('http://localhost:3000/api/likedLocations/put', requestOptions)
                .then(response => response.json())
                .then(data => {
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
        <div className="reportDetails">
            <Heading content={reportData.target.name} level={2}/>
            <p>Adres: {reportData.address}</p>
            <p>Średnia ocen: {reportData.rating}</p>
            <p>Aktualne: {reportData.actual ? "Tak" : "Nie"}</p>
            <p>Szczegóły: {reportData.details}</p>
            <p>Ostatio aktualizowane: {fixData(reportData.updatedAt)}</p>
            <p>Zgłaszający: {reportData.creator?.name} ({reportData.creator?.reliability})</p>
            {reportData.creator?.id === auth.id ?
                <ActualityButton reportId={parseInt(reportId)} isActive={reportData.actual}/>
                :
                (
                    <div>
                        <p>Oceń to zgłoszenie</p>
                        <Rating
                            name="rating"
                            value={rating}
                            onChange={(event, newValue) => {
                                updateRating(newValue)
                                setRating(newValue ?? 0);

                            }}
                        />
                    </div>
                )
            }
        </div>
    )
}
