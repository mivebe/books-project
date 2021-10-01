import React, { useEffect, useState, useContext } from 'react';
import placeholderAvatar from "../media/placeholder-avatar.jpg";
import loader from "../media/user-6.jpg";
import { InnerStorage } from "../contexts/AuthContext"
import GetUserHistory from "../components/GetUserHistory"



const UserPanel = () => {
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;
    const { id, firstName, lastName, username, email, role, avatar } = authContext.tokenInfo;

    const [image, setImage] = useState()
    const [preview, setPreview] = useState(placeholderAvatar);
    const [isLoading, setIsLoading] = useState()


    useEffect(() => {
        if (image) {
            setIsLoading(true)
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setIsLoading(false);
            }
            reader.readAsDataURL(image);

        } else {
            setPreview(placeholderAvatar);
        }

    }, [image])

    const sendImage = async e => {
        if (image) {

            let formData = new FormData();
            formData.append("cover", image);

            const res = await fetch(`${backEndURL}/uploadFile`, {
                method: "POST",
                body: formData,
            })
            const resBody = await res.json()
            return await resBody
        }
    }


    const handleImageChange = key => e => {

        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) == 'image') {
            setImage(file);
        } else {
            setImage(null);
        }
        console.log("image set");

    }


    return (
        <div className="user-page">
            <div className="up__container">

                <section className="up__avatar-section">

                    <div className="up__current-image-container">
                        <img className="up__avatar" src={`${backEndURL}/static/${avatar}` || placeholderAvatar}></img>
                    </div>

                    <div className="up__button-container">
                        <input className="cb__form-input" type="file" id="file-input" name="cover" onChange={handleImageChange("cover")}></input>
                        <button className="btn up__form-button" onClick={() => { document.getElementById("file-input").click() }}>Choose Image</button>
                        <button className="btn up__form-button" onClick={sendImage}>Upload Image</button>
                    </div>

                    <div className="up__preview__image-container">
                        <img className="up__preview__image" src={preview} alt="IMAGE"></img>
                        {isLoading && <img className="up__preview__image-loader" src={loader} alt="loading"></img>}
                    </div>

                </section>

                <section className="up__user-history">
                    <GetUserHistory userId={id} />
                </section>

                <section className="up__profile-data">

                    <div className="up__info-container">
                        <label>First Name: </label>
                        <p className="up__name up__name--first">{firstName}</p>
                        <label>Last Name: </label>
                        <p className="up__name up__name--last">{lastName}</p>
                        <label>Username: </label>
                        <p className="up__username">{username}</p>
                        <label>Email: </label>
                        <p className="up__email">{email}</p>
                        <label>Role: </label>
                        <p className="up__role">{role}</p>
                    </div>

                    <div className="up__password-form">
                        <form>
                            <label htmlFor="CurPassword">Current Password</label>
                            <input type="password" name="curPassword" autoComplete="on" required></input>

                            <label htmlFor="NewPassword">Nem Password</label>
                            <input type="password" name="NewPassword" autoComplete="on" required></input>

                            <label htmlFor="reNewPassword">Repeat New Password</label>
                            <input type="password" name="reNewPassword" autoComplete="on" required></input>
                        </form>
                    </div>

                </section>

            </div>
        </div>
    )
}

export default UserPanel
