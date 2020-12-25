import React from 'react'
import { useHistory } from "react-router-dom"

export default function Home() {

    const history = useHistory();

    return (
        <div>
            <p style={{ color: "white", fontSize: "50px", textAlign: "center" }}>Home</p>
            <button style={{ color: "white", fontSize: "50px", textAlign: "center", backgroundColor: "transparent" }}
                onClick={() => { history.push("/logout") }}>Logout</button>
            <button style={{ color: "white", fontSize: "50px", textAlign: "center", backgroundColor: "transparent" }}
                onClick={() => { history.push("/404") }}>not found page</button>
        </div>
    )
}
