import React, { useState, Modal } from 'react'
import logo from "../media/bambook-logo.png";
import TokiWoTomare from "./TokiWoTomare";

const Footer = () => {
    const [modalShow, setModalShow] = useState(false);
    const closeModalHandler = () => {
        const scrollY = document.body.style.top;   //first get scrolled distance
        document.body.style.position = 'initial';  //flip back the position
        document.body.style.top = '';              //reset the scrolled distance
        window.scrollTo(0, parseInt(scrollY || '0') * -1);  //scrol to the previously saved scroll distance
        setModalShow(false);
    }
    const openModalHandler = () => {
        document.body.style.top = `-${window.scrollY}px`;
        document.body.style.position = 'fixed';
        setModalShow(true);
    }

    return (
        <div className="footer-container">
            <div className="footer">

                <div className="footer__logo-container">
                    <img className="footer__logo" src={logo}></img>
                </div>

                <div className="col-1-of-2">
                    <p className="footer__terms" onClick={openModalHandler}>Terms of Use</p>
                    <p className="footer__copyright">Copyright &copy; by MIVEBE</p>
                </div>

                <div className="row">

                    <div className="col-1-of-3">
                        <div className="footer__navigation">
                            <ul className="footer__list">
                                <li className="footer__list-item"><img className="footer__list-image" src={logo}></img><a href="#" className="footer__link">Project1</a></li>
                                <li className="footer__list-item"><img className="footer__list-image" src={logo}></img><a href="#" className="footer__link">Project4</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-1-of-3">
                        <div className="footer__navigation">
                            <ul className="footer__list">
                                <li className="footer__list-item"><img className="footer__list-image" src={logo}></img><a href="#" className="footer__link">Project2</a></li>
                                <li className="footer__list-item"><img className="footer__list-image" src={logo}></img><a href="#" className="footer__link">Project5</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-1-of-3">
                        <div className="footer__navigation">
                            <ul className="footer__list">
                                <li className="footer__list-item"><img className="footer__list-image" src={logo}></img><a href="#" className="footer__link">Project3</a></li>
                                <li className="footer__list-item"><img className="footer__list-image" src={logo}></img><a href="#" className="footer__link">Project6</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
            {modalShow && <TokiWoTomare show={modalShow} close={closeModalHandler} />}
        </div>
    )
}

export default Footer
