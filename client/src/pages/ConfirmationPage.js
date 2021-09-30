import React from 'react'
import { useHistory } from "react-router-dom"

const ConfirmationPage = () => {
    const history = useHistory();
    return (<div className="confirmation">
        <div className="confirmation__container">
            <p className="confirmation__heading">You Have Successfully Registered</p>
            <p className="confirmation__check">✓</p>
            <button className="confirmation__btn" onClick={() => { history.push("/login") }}>&larr; Back to Login</button>
        </div>
    </div>
    )
}
export default ConfirmationPage