import React, { useEffect, useState, useContext } from 'react';
import { InnerStorage } from "../contexts/AuthContext";


const GetRating = ({ bookId, rate }) => {
    const authContext = useContext(InnerStorage);
    const { backEndURL, token } = authContext;
    const [avgRate, setAvgRate] = useState(0);

    useEffect(async () => {

        if (bookId) {
            const res = await fetch(`${backEndURL}/books/${bookId}/rating`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                }
            })

            const rate = await res.json()

            if (await rate) {
                setAvgRate(await rate.rating);

            }
        }
    }, [rate, bookId, token])

    return <>{avgRate ? <span>{avgRate.toFixed(1)}</span> : <span>N/A</span>}</>
}

export default GetRating;