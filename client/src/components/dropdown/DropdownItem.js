import React from "react"

const DropdownItem = ({ children, leftIcon, rightIcon, onClick, }) => {

    return (
        <div href="#" className="menu-item" onClick={onClick || null}>
            <span className="icon-button">{leftIcon}</span>
            {children}
            <span className="icon-right">{rightIcon}</span>
        </div>
    )
}

export default DropdownItem