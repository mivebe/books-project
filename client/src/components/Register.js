import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios"

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
            history.push("/confirmation")
        } catch (err) {
            console.log(err, "register err");
            history.push("/404")
        }


    }
    return (
        <form>
            <div className="input__box">
                <input type="text" name="fname" value={registerData.firstName} required onChange={handleRegisterChange('firstName')} />
                <label htmlFor="fname">First Name</label>
            </div>
            <div className="input__box">
                <input type="text" name="lname" value={registerData.lastName} required onChange={handleRegisterChange('lastName')} />
                <label htmlFor="lname">Last Name</label>
            </div>
            <div className="input__box">
                <input type="text" name="username" value={registerData.username} required onChange={handleRegisterChange('username')} />
                <label htmlFor="username">Username</label>
            </div>
            <div className="input__box">
                <input type="email" name="email" value={registerData.email} required onChange={handleRegisterChange('email')} />
                <label htmlFor="email">Email</label>
            </div>
            <div className="input__box">
                <input type="password" name="password" value={registerData.password} required onChange={handleRegisterChange('password')} />
                <label htmlFor="password">Password</label>
            </div>
            <div className="form__submit">
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