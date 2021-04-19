import React from 'react'

const UserPanel = () => {

    const email = "ASD";
    const username = "ASD";
    const lName = "ASD";
    const fName = "ASD";
    const userAvatar = "ASD";

    return (
        <div className="user-page">
            <div className="up__container">
                <div className="up__avatar-container">
                    <img className="up__avatar" src={userAvatar}></img>
                </div>

                <div className="up__info-container">
                    <div >
                        <p className="up__name">{fName}</p>
                        <p className="up__name">{lName}</p>
                    </div>
                    <p className="up__username">{username}</p>
                    <p className="up__email">{email}</p>
                </div>

                {/* <div className="up__password-form">
                    <label htmlFor="CurPassword">Current Password</label>
                    <input type="password" name="curPassword" required></input>

                    <label htmlFor="NewPassword">Nem Password</label>
                    <input type="password" name="NewPassword" required></input>

                    <label htmlFor="reNewPassword">Repeat New Password</label>
                    <input type="password" name="reNewPassword" required></input>
                </div> */}

            </div>
        </div>
    )
}

export default UserPanel
