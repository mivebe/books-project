import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios"
import "../styles/LoginButton.css"

const Register = () => {
    const history = useHistory();
    const [registerData, setRegisterData] = useState({ firstName: "", lastName: "", username: "", email: "", password: "" });

    const handleRegisterChange = key => e => setRegisterData({ ...registerData, [key]: e.target.value });

    const handleRegister = async e => {
        e.preventDefault();
        console.log(registerData);
        const body = { ...registerData }
        try {
            const res = await axios.post("http://localhost:3001/users/register", body)
            console.log(res)
            history.push("/register")
        } catch (err) {
            console.log(err, "gosho");
            history.push("/404")
        }


    }
    return (
        <form>
            <div className="inputBox">
                <input type="text" value={registerData.firstName} required onChange={handleRegisterChange('firstName')} />
                <label htmlFor="">First Name</label>
            </div>
            <div className="inputBox">
                <input type="text" value={registerData.lastName} required onChange={handleRegisterChange('lastName')} />
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
                <input type="password" value={registerData.password} required onChange={handleRegisterChange('password')} />
                <label htmlFor="">Password</label>
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
    )
}
export default Register