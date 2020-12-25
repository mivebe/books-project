import "../../styles/LoginPage.css"
import logo from "../../media/bambook-logo.png"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

const LoginPage = () => {
    const history = useHistory();
    const [panelSelected, setPanelSelected] = useState(true)
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [registerData, setRegisterData] = useState({ fName: "", lName: "", username: "", email: "", regPassword: "", confirmRegPassword: "" })

    const handleLoginChange = key => e => setLoginData({ ...loginData, [key]: e.target.value });
    const handleRegisterChange = key => e => setRegisterData({ ...registerData, [key]: e.target.value });

    const handleLogin = e => {
        e.preventDefault();
        console.log(loginData);
        axios.post("http://localhost:3000/login", loginData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        history.push("/home");
    }
    const handleRegister = e => {
        e.preventDefault();
        console.log(registerData);
        history.push("/register")
    }

    return (<>
        <div id="heading-primary">
            <img className="logo" src={logo} alt="logo"></img>
            <p id="heading-primary-main"><span>Bam</span><span>Book</span></p>
            <p id="heading-primary-sub">Some may read it as бомбок, but this is not the case.</p>
        </div>
        {panelSelected ?
            <div className="box">
                <div style={{ width: "100%", color: "white", display: "flex", justifyContent: "center" }}>
                    <p style={{ alignSelf: "flex-start" }} onClick={e => setPanelSelected(true)} >Login</p>
                    <p style={{ alignSelf: "flex-end" }} onClick={e => setPanelSelected(false)}>Register</p>
                </div>
                <h2>Sigh in</h2>
                <form>
                    <div className="inputBox">
                        <input type="text" value={loginData.username} required onChange={handleLoginChange('username')} />
                        <label htmlFor="">Username</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" value={loginData.password} required onChange={handleLoginChange('password')} />
                        <label htmlFor="">Password</label>
                    </div>
                    <div id="submit">
                        <input type="submit" name="submit" value="Login" onClick={handleLogin} />
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <noscript>
                        <input type="submit" value="Submit form!" />
                    </noscript>
                </form>
            </div>
            :
            <div className="box">
                <div style={{ width: "100%", color: "white" }}>
                    <p onClick={e => setPanelSelected(true)}>left</p>
                    <p onClick={e => setPanelSelected(false)}>right</p>
                </div>
                <h2>Register</h2>
                <form>
                    <div className="inputBox">
                        <input type="text" value={registerData.fName} required onChange={handleRegisterChange('fName')} />
                        <label htmlFor="">First Name</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" value={registerData.lName} required onChange={handleRegisterChange('lName')} />
                        <label htmlFor="">Last Name</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" value={registerData.username} required onChange={handleRegisterChange('username')} />
                        <label htmlFor="">Username</label>
                    </div>
                    <div className="inputBox">
                        <input type="email" value={registerData.email} required onChange={handleRegisterChange('email')} />
                        <label htmlFor="">Email</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" value={registerData.regPassword} required onChange={handleRegisterChange('regPassword')} />
                        <label htmlFor="">Password</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" value={registerData.confirmRegPassword} required onChange={handleRegisterChange('confirmRegPassword')} />
                        <label htmlFor="">Confirm Password</label>
                    </div>
                    <div id="submit">
                        <input type="submit" name="submit" value="Register" onClick={handleRegister} />
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <noscript>
                        <input type="submit" value="Submit form!" />
                    </noscript>
                </form>
            </div>
        }

    </>)
}

export default LoginPage;
