import logo from "../media/bambook-logo.png"
import { useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"
import LoginTabs from "../components/LoginTabs"

const LoginPage = () => {
    const [panelSelected, setPanelSelected] = useState(true)

    return (
        <div className="login-page">
            <section className="site-identity">
                <img className="logo" src={logo} alt="logo"></img>
                <p className="heading__primary"><span>Bam</span><span>Book</span></p>
                <p className="heading__secondary">Some may read it as бомбок, but this is not the case.</p>
            </section>
            <section className="login-section">
                <LoginTabs panelSelected={panelSelected} setPanelSelected={setPanelSelected} />
                {panelSelected ? <Login /> : <Register />}
            </section>
        </div>
    )
}

export default LoginPage;
