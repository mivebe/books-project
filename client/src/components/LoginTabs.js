import React from 'react'
import "../styles/LoginTabs.css"

export default function LoginTabs({ panelSelected, setPanelSelected }) {
    return (
        <>
            {panelSelected ?
                <div id="tabs-container">
                    <p className="tab noselect" onClick={e => setPanelSelected(true)} >Login</p>
                    <p className="tab register-tab noselect" onClick={e => setPanelSelected(false)} >Register</p>
                </div>
                :
                <div id="tabs-container">
                    <p className="tab login-tab noselect" onClick={e => setPanelSelected(true)} >Login</p>
                    <p className="tab noselect" onClick={e => setPanelSelected(false)} >Register</p>
                </div>
            }
        </>
    )
}
