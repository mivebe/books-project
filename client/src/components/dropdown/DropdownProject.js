const DropdownProject = ({ data }) => {
    return (
        <li className="mobile-projects__list-item">
            <img className="mobile-projects__list-image" src={data.image} />
            <a href="#" className="mobile-projects__link">{data.name}</a>
        </li>
    )
}

export default DropdownProject
