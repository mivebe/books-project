

export default function LoginTabs({ panelSelected, setPanelSelected }) {
    return (
        <>
            {panelSelected ?
                <div id="tabs-container">
                    <p className="tab" onClick={e => setPanelSelected(true)} >Login</p>
                    <p className="tab register-tab" onClick={e => setPanelSelected(false)} >Register</p>
                </div>
                :
                <div id="tabs-container">
                    <p className="tab login-tab" onClick={e => setPanelSelected(true)} >Login</p>
                    <p className="tab" onClick={e => setPanelSelected(false)} >Register</p>
                </div>
            }
        </>
    )
}
