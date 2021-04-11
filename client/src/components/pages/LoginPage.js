import logo from "../../media/bambook-logo.png"
import { useState } from "react"
import Login from "../Login"
import Register from "../Register"
import LoginTabs from "../LoginTabs"

const LoginPage = () => {
    const [panelSelected, setPanelSelected] = useState(true)

    return (<>
        <div className="heading">
            <img className="logo" src={logo} alt="logo"></img>
            <p className="heading__primary"><span>Bam</span><span>Book</span></p>
            <p className="heading__secondary">Some may read it as бомбок, but this is not the case.</p>
        </div>
        <div className="box">
            {panelSelected ?
                <><LoginTabs panelSelected={panelSelected} setPanelSelected={setPanelSelected} />
                    <Login /></> :
                <><LoginTabs panelSelected={panelSelected} setPanelSelected={setPanelSelected} />
                    <Register /></>}
        </div>
    </>)
}

export default LoginPage;
