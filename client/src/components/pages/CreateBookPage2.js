import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { InnerStorage } from "../../App";

const CreateBookPage2 = () => {

    const curYear = new Date().getFullYear();
    const authContext = useContext(InnerStorage);
    const [bookInfo, setBookInfo] = useState({
        cover: "",
        title: "",
        author: "",
        genre: "",
        publishdate: "",
        listed: "",
        copies: "",
        description: "",
    });

    const handleInputChange = key => e => {
        // console.log(e.target.type);
        e.target.type !== "checkbox" ? setBookInfo({ ...bookInfo, [key]: e.target.value }) :
            setBookInfo({ ...bookInfo, [key]: e.target.checked });
        // console.log(bookInfo);
    };
    useEffect(() => {
        console.log(bookInfo);

    }, [bookInfo])

    const handleImageChoice = key => e => {
        const imageFile = e.target.files[0];
        console.log("imageFile", imageFile);
        const formData = new FormData();
        formData.append("cover", imageFile);
        console.log("formData", formData);

        setBookInfo({ ...bookInfo, [key]: imageFile });
        console.log("bookInfo.cover", bookInfo.cover);

    }

    const radioControl = (e) => {
        console.log(bookInfo.genre == e.target.value);
        if (bookInfo.genre == e.target.value) {
            return 'true'
        } else {
            return 'false'
        }
    }

    const handleSubmit = async (e) => {
        // const inputs = document.querySelectorAll(".cb__form-input");
        // console.log(inputs);
        // const radios = document.querySelectorAll(".cb__form-input--radio");
        // console.log(radios);
        // radios.forEach((node) => {
        //     node.checked && console.log(node.value, node.checked);
        // })
        // inputs.forEach((node) => {
        //     console.log(node.value);
        // })
        // const listed = document.getElementById("listed");
        // console.log(listed.value, listed.checked);

        e.preventDefault();
        console.log(bookInfo);
        const body = { ...bookInfo }

        try {
            const res = await axios.post("http://localhost:3001/books/", body, {
                headers: {
                    'Authorization': `Bearer ${authContext.token}`
                }
            })
            console.log(res.data);

            // history.push("/home");
        } catch (err) {
            console.log(err, "Book Creation Error");
            // history.push("/404")
        }

    }

    const [image, setImage] = useState({})
    const fileOnChange = (e) => {
        setImage(e.target.files[0]);
        console.log("image set");
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

                    <label htmlFor="cover">COVER</label>
                    <input className="cb__form-input" type="file" name="cover" onChange={handleImageChoice('cover')} ></input>
                    {/* <button className="upload-button" onClick={() => { handleUploadClick }}>Upload Image</button> */}

                    <label htmlFor="title">TITLE</label>
                    <input className="cb__form-input" type="text" name="title" defaultValue={bookInfo.title} onChange={handleInputChange('title')} required></input>

                    <label htmlFor="author">AUTHOR</label>
                    <input className="cb__form-input" type="text" name="author" defaultValue={bookInfo.author} onChange={handleInputChange('author')} required></input>

                    <label htmlFor="genre">GENRE</label>
                    <div className="cb__radio-list row">
                        <li className="col-1-of-4">
                            <input type="radio" name="genre" className="cb__form-input--radio" defaultValue="Classics" onChange={handleInputChange('genre')} required></input>
                            <label htmlFor="Classics">Classics</label>
                        </li>
                        <li className="col-1-of-4">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Detective & Mystery"></input>
                            <label htmlFor="Detective & Mystery">Detective & Mystery</label>
                        </li>
                        <li className="col-1-of-4">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Science Fiction"></input>
                            <label htmlFor="Science Fiction">Science Fiction</label>
                        </li>
                        <li className="col-1-of-4">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Action & Adventure"></input>
                            <label htmlFor="Action & Adventure">Action & Adventure</label>
                        </li>
                    </div>

                    <div className="cb__radio-list row">
                        <li className="col-1-of-4">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Romance"></input>
                            <label htmlFor="Romance">Romance</label>
                        </li>
                        <li className="col-1-of-4">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Comic Book & Novel"></input>
                            <label htmlFor="Comic Book & Novel">Comic Book & Novel</label>
                        </li>
                        <li className="col-1-of-4">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Short Stories"></input>
                            <label htmlFor="Short Stories">Short Stories</label>
                        </li>
                        <li className="col-1-of-4">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Horror"></input>
                            <label htmlFor="Horror">Horror</label>
                        </li>
                    </div>

                    <label htmlFor="publishdate">PUBLISHDATE</label>
                    <input className="cb__form-input" type="number" name="publishdate" defaultValue={bookInfo.publishdate} min="1497" max={curYear} onChange={handleInputChange('publishdate')} required></input>

                    <input className="cb__form-input" type="checkbox" name="listed" id="listed" checked={bookInfo.listed} onChange={handleInputChange('listed')} defaultValue="Book is Visible"></input>
                    <label htmlFor="listed">VISIBILITY</label>

                    <label htmlFor="copies">NUMBER OF COPIES</label>
                    <input className="cb__form-input" type="number" name="copies" min="0" defaultValue={bookInfo.copies} onChange={handleInputChange('copies')} required></input>

                    <label htmlFor="description">DESCRIPTION</label>
                    <input className="cb__form-input" type="text" name="description" defaultValue={bookInfo.description} onChange={handleInputChange('description')} required></input>

                    <input defaultValue="Create Book" onClick={handleSubmit}></input>
                </form>
            </div>
        </div>
    )
}

export default CreateBookPage2
