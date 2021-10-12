import { useState } from 'react'
import { useHistory } from "react-router-dom";
import logo from "../media/bambook-logo.png";
import ProjectsDropdown from './dropdown/ProjectsDropdown';

// import TokiWoTomare from "./TokiWoTomare";

const Footer = () => {
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="footer__container--padding">
            {/* <div className="footer__container--fixed">  //uncomment for sticky behavior   */}
            <footer className="footer">

                <div className="footer__logo-container">
                    <img className="footer__logo" src={logo}></img>
                </div>

                <div className="footer__info">
                    <p className="footer__info__copyright">Copyright &copy; by MIVEBE</p>
                </div>

                <section className="footer__projects-section">

                    <div className="projectcol">
                        <div className="projectcol__navigation">
                            <ul className="projectcol__list">
                                <li className="projectcol__list-item"><img className="projectcol__list-image" src={logo}></img><a href="#" className="projectcol__link">Project1</a></li>
                                <li className="projectcol__list-item"><img className="projectcol__list-image" src={logo}></img><a href="#" className="projectcol__link">Project4</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="projectcol">
                        <div className="projectcol__navigation">
                            <ul className="projectcol__list">
                                <li className="projectcol__list-item"><img className="projectcol__list-image" src={logo}></img><a href="#" className="projectcol__link">Project2</a></li>
                                <li className="projectcol__list-item"><img className="projectcol__list-image" src={logo}></img><a href="#" className="projectcol__link">Project5</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="projectcol">
                        <div className="projectcol__navigation">
                            <ul className="projectcol__list">
                                <li className="projectcol__list-item"><img className="projectcol__list-image" src={logo}></img><a href="#" className="projectcol__link">Project3</a></li>
                                <li className="projectcol__list-item"><img className="projectcol__list-image" src={logo}></img><a href="#" className="projectcol__link">Project6</a></li>
                            </ul>
                        </div>
                    </div>

                </section>
                <section className="footer__projects-section--mobile">
                    <button className="navbar__btn navbar__btn--green" onClick={() => setIsOpen(!isOpen)}>Projects</button>
                </section>
                {isOpen && <ProjectsDropdown onClose={() => setIsOpen(false)} />}
            </footer>
            {/* </div> */}
        </div>
    )
}

export default Footer
