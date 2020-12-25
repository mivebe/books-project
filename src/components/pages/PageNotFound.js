import React from 'react'
import NotFoundImage from "../../media/404.png"

export default function PageNotFound() {
    return (
        <div style={{ background: "white", width: "100vw", height: "100vh", display: "flex", justifyContent: "centeer" }}>
            <img style={{ position: "absolute", width: "50vw", height: "50vh", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} src={NotFoundImage} />
        </div>
    )
}
