import "../../styles/LoginPage.css"
import logo from "../../media/bambook-logo.png"
import { useState } from "react"
import Login from "../Login"
import Register from "../Register"


const LoginPage = () => {
    const [panelSelected, setPanelSelected] = useState(true)

    return (<>
        <div id="heading-primary">
            <img className="logo" src={logo} alt="logo"></img>
            <p id="heading-primary-main"><span>Bam</span><span>Book</span></p>
            <p id="heading-primary-sub">Some may read it as бомбок, but this is not the case.</p>
        </div>
        <div className="box">
            <div style={{ width: "100%", color: "white", display: "flex", justifyContent: "center" }}>
                <p style={{ alignSelf: "flex-start" }} onClick={e => setPanelSelected(true)} >Login</p>
                <p style={{ alignSelf: "flex-end" }} onClick={e => setPanelSelected(false)}>Register</p>
            </div>
            {panelSelected ? <Login /> : <Register />}
        </div>
    </>)
}

export default LoginPage;
