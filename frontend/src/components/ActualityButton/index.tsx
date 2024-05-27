import React, { useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface ActualityButtonProps {
    reportId: number;
    isActive: boolean;
}

export default function ActualityButton({ reportId, isActive }: ActualityButtonProps) {
    const auth = useAuthUser();
    const [isActual, setActuality] = useState(isActive);

    const SetAsActual = () => {
        const reqData = {
            actual: true
        };
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqData)
        };
        console.log(JSON.stringify(reqData));
        fetch('http://localhost:3000/api/location/put/' + reportId, requestOptions)
            .then(response => response.json())
            .then(data => {
                setActuality(true);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const SetAsOtDated = () => {
        const reqData = {
            actual: false
        };
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reqData)
        };
        fetch('http://localhost:3000/api/location/put/' + reportId, requestOptions)
            .then(response => response.json())
            .then(data => {
                setActuality(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <button className={`btn ${isActual ? "btn-danger" : "btn-primary"}`} onClick={isActual ? SetAsOtDated : SetAsActual}>
            {isActual ? "Ustaw jako nieaktywne" : "Ustaw jako aktywne"}
        </button>
    );
}
