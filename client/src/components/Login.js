import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios"
import "../styles/LoginButton.css"
import { InnerStorage } from '../App';

export default function Login() {
    const history = useHistory();
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const authContext = useContext(InnerStorage)

    const handleLoginChange = key => e => setLoginData({ ...loginData, [key]: e.target.value });

    const handleLogin = async e => {
        e.preventDefault();
        console.log(loginData);
        const body = { ...loginData }

        try {
            const res = await axios.post("http://localhost:3001/users/login", body)
            console.log(res.data);
            document.cookie = `token=${res.data.token}`
            document.cookie = `refreshToken=${res.data.refreshToken}`

            authContext.setToken(res.token);
            authContext.setRefreshToken(res.refreshToken);
            authContext.setLogged(true);

            history.push("/home");
        } catch (err) {
            console.log(err, "login err");
            history.push("/404")
        }

    }

    return (
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
    )
}
