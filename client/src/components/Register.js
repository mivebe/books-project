import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios"

export default function Register() {
    const history = useHistory();
    const [registerData, setRegisterData] = useState({ fName: "", lName: "", regUsername: "", email: "", regPassword: "" });

    const handleRegisterChange = key => e => setRegisterData({ ...registerData, [key]: e.target.value });

    const handleRegister = e => {
        e.preventDefault();
        console.log(registerData);
        axios.post("http://localhost:3001/register", { ...registerData }).then(res => console.log(res))
        history.push("/register")
    }
    return (
        <div >
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
                    <input type="text" value={registerData.regUsername} required onChange={handleRegisterChange('regUsername')} />
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

    )
}
