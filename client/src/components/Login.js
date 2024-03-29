import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios"
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
    const history = useHistory();
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const authContext = useContext(AuthContext);
    const { backEndURL } = authContext;

    const handleLoginChange = key => e => setLoginData({ ...loginData, [key]: e.target.value });

    const handleLogin = async e => {
        e.preventDefault();
        // console.log("input fields", loginData);
        const body = { ...loginData }
        // console.log("what is sent to server", body);

        try {
            const res = await axios.post(`${backEndURL}/users/login`, body)
            console.log("from Login.js", res.data);
            document.cookie = `token=${res.data.token}`
            document.cookie = `refreshToken=${res.data.refreshToken}`

            authContext.setToken(res.token);
            authContext.setRefreshToken(res.refreshToken);
            authContext.setLogged(res.data.token && res.data.refreshToken ? true : false);
            authContext.setTokenInfo({ ...res.data.user })
            console.log("res data", { ...res.data.user });

            history.push("/home")
        } catch (err) {
            console.log(err, "login err");
            history.push("/404")
        }

    }

    return (
        <form autoFocus>
            <div className="input__box">
                <input type="text" value={loginData.username} required onChange={handleLoginChange('username')} autoComplete={loginData.username} />
                <label htmlFor="">Username</label>
            </div>
            <div className="input__box">
                <input type="password" value={loginData.password} required onChange={handleLoginChange('password')} autoComplete={loginData.password} />
                <label htmlFor="">Password</label>
            </div>
            <div className="form__submit">
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
