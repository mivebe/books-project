import React, { useState } from 'react'

const CreateBookPage = () => {
    const curYear = new Date().getFullYear();

    // const handleUploadClick = (e) => {
    //     e.preventDefault();
    //     document.getElementById("upload-cover").click();
    //     console.log(document.getElementById("upload-cover"));
    // }

    // const handleUploadFile = async (e) => {
    //     const chosenFile = (e.target.files[0])
    //     const fileFormData = new FormData();
    //     fileFormData.append("file", chosenFile, chosenFile.name);
    //     console.log(fileFormData);
    // }

    const handleSubmit = () => {
        const asd = document.querySelectorAll(".cb__form-input");
        console.log(asd);
        asd.forEach((node) => {
            console.log(node.nodeValue);
        })
    }

    const [image, setImage] = useState({})
    const fileOnChange = (e) => {
        setImage(e.target.files[0]);
        console.log("imge set");
    }
    const sendImage = (e) => {
        let formData = new FormData();

        formData.append("cover", image);

        fetch("http://localhost:3001/uploadFile", {
            method: "post",
            body: formData,
        })
            .then((res) => res.json())
            .then((resBody) => {
                console.log(resBody);
            })
    }

    return (
        <div className="create-book__page">
            <div className="cb__form-container" style={{ padding: "5rem", fontSize: "2rem" }}>

                {/* <div>
                    <input type="file" onChange={fileOnChange}></input>
                    <button onClick={sendImage}>Upload</button>
                </div> */}

                {/* <form action="http://localhost:3001/uploadFile" method="POST" encType="multipart/form-data">
                    <label htmlFor="cover">COVER</label>
                    <input className="cb__form-input" type="file" name="cover" id="upload-cover" onChange={() => { handleUploadFile }}></input>
                    <button className="upload-button" onClick={(e) => { handleUploadClick }}>Upload Image</button>
                </form> */}
                <form className="cb__form" style={{ display: "flex", flexDirection: "column" }}>
                    <p>FORM</p>

                    {/* <label htmlFor="cover">COVER</label>
                    <input className="cb__form-input" type="file" name="cover" ></input> */}
                    {/* <button className="upload-button" onClick={() => { handleUploadClick }}>Upload Image</button> */}

                    <label htmlFor="title">TITLE</label>
                    <input className="cb__form-input" type="text" name="title" required></input>

                    <label htmlFor="author">AUTHOR</label>
                    <input className="cb__form-input" type="text" name="author" required></input>

                    <label >GENRE</label>
                    <ul className="cb__form-input">
                        <li >
                            <input type="radio" name="genre" defaultValue="Classics" required></input>
                            <label htmlFor="Classics">Classics</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Detective & Mystery"></input>
                            <label htmlFor="Detective & Mystery">Detective & Mystery</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Science Fiction"></input>
                            <label htmlFor="Science Fiction">Science Fiction</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue=""></input>
                            <label htmlFor="Action & Adventure">Action & Adventure</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Romance"></input>
                            <label htmlFor="Romance">Romance</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Comic Book & Novel"></input>
                            <label htmlFor="Comic Book & Novel">Comic Book & Novel</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Short Stories"></input>
                            <label htmlFor="Short Stories">Short Stories</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Horror"></input>
                            <label htmlFor="Horror">Horror</label>
                        </li>
                    </ul>


                    <label htmlFor="publishdate">PUBLISHDATE</label>
                    <input className="cb__form-input" type="number" name="publishdate" min="1497" max={curYear} required></input>

                    <input className="cb__form-input" type="checkbox" name="listed" defaultValue="Book is Visible"></input>
                    <label htmlFor="listed">VISIBILITY</label>

                    <label htmlFor="copies">AMMOUNT OF COPIES</label>
                    <input className="cb__form-input" type="number" name="copies" min="0" required></input>

                    <label htmlFor="description">DESCRIPTION</label>
                    <input className="cb__form-input" type="text" name="description" required></input>

                    <input defaultValue="Create Book" onClick={handleSubmit}></input>
                </form>
            </div>
        </div>
    )
}

export default CreateBookPage
