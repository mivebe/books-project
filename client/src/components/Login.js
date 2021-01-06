import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios"
import { InnerStorage } from "../App"

export default function Login() {
    const authContext = useContext(InnerStorage)
    const history = useHistory();
    const [loginData, setLoginData] = useState({ username: "", password: "" });


    const handleLoginChange = key => e => setLoginData({ ...loginData, [key]: e.target.value });

    const handleLogin = e => {
        e.preventDefault();
        authContext.setToken(true);
        console.log(loginData);
        axios.post("http://localhost:3000/login", loginData)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        history.push("/home");
    }

    return (
        <div>
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
    )
}
