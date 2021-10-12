import projectsList from "../../data/projectsList.json"
import ReactDom from 'react-dom'
import DropdownProject from "./DropdownProject";
const ProjectsDropdown = ({ onClose }) => {

    return ReactDom.createPortal(
        <div className="modal-overlay">
            <div className="mobile-projects">
                <button className="btn btn--white" onClick={onClose}>X</button>
                <ul className="mobile-projects__list">
                    {projectsList && projectsList.projects.map((p, i) => <DropdownProject key={i} data={p} />)}
                </ul>
            </div>
        </div>,
        document.getElementById('portal')
    )
}

export default ProjectsDropdown
