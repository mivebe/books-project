import React from 'react'
import { useHistory } from "react-router-dom"

const ConfirmationPage = () => {
    const history = useHistory();
    return (
        <div style={{ position: "absolute", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ color: "white", fontSize: "50px", textAlign: "center" }}>You Have Successfully Registered</p>
            <p style={{ color: "green", fontWeight: "900", fontSize: "180px", textAlign: "center", height: "20vh", width: "20vh", backgroundColor: "rgba(0,139,139, 0.5)", borderRadius: "50%" }}>✓</p>
            <button style={{ fontSize: "3em", backgroundColor: "transparent", color: "white", border: "none", marginTop: "5vh" }} onClick={() => { history.push("/login") }}>Back to Login</button>
        </div>
    )
}
export default ConfirmationPage