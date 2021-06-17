import React from "react"

const DropdownItem = ({ children, leftIcon, rightIcon, onClick, }) => {

    return (
        <a href="#" className="menu-item" onClick={onClick || null}>
            <span className="icon-button">{leftIcon}</span>
            {children}
            <span className="icon-right">{rightIcon}</span>
        </a>
    )
}

export default DropdownItem