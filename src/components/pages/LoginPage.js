import "../../styles/LoginPage.css"
import logo from "../../media/bambook-logo.png"
import { useHistory } from "react-router-dom"

const LoginPage = () => {
    const history = useHistory();

    return (<>
        <div id="heading-primary">
            <img className="logo" src={logo} alt="logo"></img>
            <p id="heading-primary-main"><span>Bam</span><span>Book</span></p>
            <p id="heading-primary-sub">Some may read it as бомбок, but this is not the case.</p>
        </div>
        <div className="box">
            <h2>Sigh in</h2>
            <form>
                <div className="inputBox">
                    <input type="text" name="" required />
                    <label htmlFor="">Username</label>
                </div>
                <div className="inputBox">
                    <input type="password" name="" required />
                    <label htmlFor="">Password</label>
                </div>
                <div id="submit">
                    <input type="submit" name="submit" value="Login" onClick={() => { history.push("/home") }} />
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </form>
            <div>
                <button style={{ height: "40px", width: "80px" }} onClick={() => { history.push("/register") }}>Register</button>
            </div>
        </div>
        <noscript>
            <input type="submit" value="Submit form!" />
        </noscript>
    </>)
}

export default LoginPage;
