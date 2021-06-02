import React, { useEffect, useState } from 'react';
import userAvatar from "../../media/user-6.jpg";
import placeholderAvatar from "../../media/placeholder-avatar.jpg";
import loader from "../../media/user-6.jpg";



const UserPanel = () => {

    const [image, setImage] = useState()
    const [preview, setPreview] = useState(placeholderAvatar);
    const [isLoading, setIsLoading] = useState()

    const email = "test@asd.com";
    const username = "UseRnamE";
    const lName = "Lastname";
    const fName = "Firstname";

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
                method: "post",
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
                <div className="up__avatar-section">

                    <div className="up__current-image-container">
                        <img className="up__avatar" src={placeholderAvatar}></img>
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

                </div>

                <div className="up__info-container">
                    <label>First Name: </label>
                    <p className="up__name up__name--first">{fName}</p>
                    <label>Last Name: </label>
                    <p className="up__name up__name--last">{lName}</p>
                    <label>Username: </label>
                    <p className="up__username">{username}</p>
                    <label>Email: </label>
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
