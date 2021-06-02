import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { InnerStorage } from "../../App";
import placeholderBook from "../../media/grey-book.png";
import loader from "../../media/user-6.jpg";

const CreateBookPage2 = () => {

    const curYear = new Date().getFullYear();
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;

    const [image, setImage] = useState()
    const [preview, setPreview] = useState(placeholderBook);
    const [isLoading, setIsLoading] = useState()

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
        e.target.type !== "checkbox" ?
            setBookInfo({ ...bookInfo, [key]: e.target.value }) :
            setBookInfo({ ...bookInfo, [key]: e.target.checked });
    };

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
            setPreview(placeholderBook);
        }

    }, [image])

    useEffect(() => {
        console.log("bookInfo", bookInfo);
    }, [bookInfo])




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // console.log(bookInfo);
            const body = { ...bookInfo }

            const { imageID } = await sendImage();
            // console.log(await imageID);
            setBookInfo({ ...bookInfo, "cover": imageID });

            const res = await axios.post(`${backEndURL}/books/`, body, {
                headers: {
                    'Authorization': `Bearer ${authContext.token}`
                }
            })
            console.log("Book Created !!! ", res.data);
            console.log(res.data.id);

            //display popup or modal saying that book is created successfully and give two options
            //option 1 create another  -> a button to reload the create-book page
            //option 2 see the book    -> a button to link the book page with the correct id of the newly created book

            // history.push("/book/");
        } catch (err) {
            console.log(err, "Book Creation Error");
            // Display some popup or modal saying that something is wrong 
            // history.push("/404");
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

    return (
        <div className="create-book__page">
            <div className="cb__preview__container">

                <div className="cb__preview__image-container">
                    <img className="cb__preview__image" src={preview} alt="IMAGE"></img>
                    {isLoading && <img className="cb__preview__image-loader" src={loader} alt="loading"></img>}
                </div>

                <div className="cb__preview__info-container">
                    <p className="cb__preview__title">{bookInfo.title || " "}</p>
                    <p className="cb__preview__author">{bookInfo.author}</p>

                    <div className="cb__preview__info-container--secondary">
                        <p className="cb__preview__genre">{bookInfo.genre}</p>
                        <p className="cb__preview__publishdate">{bookInfo.publishdate}</p>
                        <p className="cb__preview__copies">{bookInfo.copies}</p>
                        <p className="cb__preview__visibility">{bookInfo.listed ? "Visible" : "Hidden"}</p>
                    </div>
                </div>

                <div className="cb__preview__description-container">
                    <p className="cb__preview__description">{bookInfo.description}</p>
                </div>

            </div>

            <div className="cb__form-container" >

                <form className="cb__form" >
                    <p className="cb__form-title">FORM</p>

                    <label htmlFor="cover">COVER</label>
                    <input className="cb__form-input" type="file" id="file-input" name="cover" onChange={handleImageChange("cover")}></input>
                    <button className="btn cb__form-button" onClick={() => { document.getElementById("file-input").click() }}>Choose Image</button>

                    <label htmlFor="title">TITLE</label>
                    <input className="cb__form-input" type="text" name="title" defaultValue={bookInfo.title} onChange={handleInputChange('title')} required></input>

                    <label htmlFor="author">AUTHOR</label>
                    <input className="cb__form-input" type="text" name="author" defaultValue={bookInfo.author} onChange={handleInputChange('author')} required></input>

                    <label htmlFor="genre">GENRE</label>
                    <div className="cb__radio-list">
                        <li className="cb__radio-list__list-item">
                            <input type="radio" name="genre" className="cb__form-input--radio" defaultValue="Classics" onChange={handleInputChange('genre')} required></input>
                            <label htmlFor="Classics">Classics</label>
                        </li>
                        <li className="cb__radio-list__list-item">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Detective & Mystery"></input>
                            <label htmlFor="Detective & Mystery">Detective & Mystery</label>
                        </li>
                        <li className="cb__radio-list__list-item">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Science Fiction"></input>
                            <label htmlFor="Science Fiction">Science Fiction</label>
                        </li>
                        <li className="cb__radio-list__list-item">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Action & Adventure"></input>
                            <label htmlFor="Action & Adventure">Action & Adventure</label>
                        </li>
                        <li className="cb__radio-list__list-item">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Romance"></input>
                            <label htmlFor="Romance">Romance</label>
                        </li>
                        <li className="cb__radio-list__list-item">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Comic Book & Novel"></input>
                            <label htmlFor="Comic Book & Novel">Comic Book & Novel</label>
                        </li>
                        <li className="cb__radio-list__list-item">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Short Stories"></input>
                            <label htmlFor="Short Stories">Short Stories</label>
                        </li>
                        <li className="cb__radio-list__list-item">
                            <input type="radio" name="genre" className="cb__form-input--radio" onChange={handleInputChange('genre')} defaultValue="Horror"></input>
                            <label htmlFor="Horror">Horror</label>
                        </li>
                    </div>

                    <label htmlFor="publishdate">PUBLISHDATE</label>
                    <input className="cb__form-input cb__form-input--date" type="number" name="publishdate" defaultValue={bookInfo.publishdate} min="1497" max={curYear} onChange={handleInputChange('publishdate')} required></input>

                    <label htmlFor="listed">VISIBILITY</label>
                    <input className="cb__form-input cb__form-input--visibility" type="checkbox" name="listed" id="listed" checked={bookInfo.listed} onChange={handleInputChange('listed')} defaultValue="Book is Visible"></input>

                    <label htmlFor="copies">NUMBER OF COPIES</label>
                    <input className="cb__form-input cb__form-input--copies" type="number" name="copies" min="0" defaultValue={bookInfo.copies} onChange={handleInputChange('copies')} required></input>

                    <label htmlFor="description">DESCRIPTION</label>
                    <textarea className="cb__form-input cb__form-input--desc" type="text" name="description" defaultValue={bookInfo.description} onChange={handleInputChange('description')} required></textarea>

                    <input className="btn cb__form-button" defaultValue="Create Book" onClick={handleSubmit}></input>
                </form>
            </div>
        </div>
    )
}

export default CreateBookPage2