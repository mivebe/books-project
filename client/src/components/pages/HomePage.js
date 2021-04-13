import React, { useContext } from 'react'
import { useHistory } from "react-router-dom"
import { InnerStorage } from '../../App';

export default function Home() {

    const authContext = useContext(InnerStorage)
    const history = useHistory();

    return (
        <div id="home">
            <div className="">
                <p className="heading">Home</p>


                {/* <header id="masthead">
                <a href="/" className="logo" >
                    <img alt="hui" src=""></img>
                    <span>Web Design Costa Rica</span>
                </a>
                <nav role="navigation">
                    <ul>
                        <li className="n-services"><a href="/innovate"><span>Innovative<strong>Websites</strong></span></a></li>
                        <li className="n-portfolio"><a href="/launch"><span>Launch <strong>Portfolio</strong></span></a></li>
                        <li className="n-team"><a href="/troopers"><span>Design <b>Troopers</b></span></a></li>
                        <li className="n-blog"><a href="/journey"><span>Space <b>Journey</b></span></a></li>
                        <li className="n-contact"><a href="/contact"><span>Get In <b>Touch</b></span></a></li>
                        <li className="n-quote"><a href="/quote" className="quotebox"><span>Quick <b>Quote</b></span></a></li>
                    </ul>
                </nav>
            </header> */}






                <button className="logout-btn"
                    onClick={() => {
                        document.cookie = "token=;expires=Thu,01 Jan 1970 00:00:00 UTC";
                        document.cookie = "refreshToken=;expires=Thu,01 Jan 1970 00:00:00 UTC";

                        authContext.setToken(null);
                        authContext.setRefreshToken(null)
                        authContext.setLogged(false);

                        history.push("/logout");
                    }}>Logout</button>
            </div>
        </div>
    )
}
