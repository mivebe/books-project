import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { InnerStorage } from "../contexts/AuthContext";
import placeholderBook from "../../media/grey-book.png";
import loader from "../../media/user-6.jpg";
import Modal from "../Modal"
import checkmark from "../../media/checkmark.svg.png"

const CreateBookPage = () => {
    const history = useHistory()
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;
    const curYear = new Date().getFullYear();

    const [isOpen, setIsOpen] = useState(false)
    const [modalData, setModalData] = useState({
        image: checkmark,
        message: "Book Created Successfully!",
        url: ""
    });
    const [image, setImage] = useState()
    const [preview, setPreview] = useState(placeholderBook);
    const [isLoading, setIsLoading] = useState()

    const [bookInfo, setBookInfo] = useState({
        title: "",
        author: "",
        genre: "",
        publishdate: "",
        listed: false,
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

    const stateClear = (e) => {
        setBookInfo({
            title: "",
            author: "",
            genre: "",
            publishdate: "",
            listed: false,
            copies: "",
            description: "",
        });
        setImage();
        setPreview(placeholderBook);

        const btn = document.querySelector('input[type="radio"][name="genre"]:checked');
        if (btn) { btn.checked = false; }
        setIsOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { imageID } = await sendImage();
            if (!imageID) {
                console.log('did not create book because of no image');
                return false;
            }
            // setBookInfo({ ...bookInfo, "cover": imageID });

            const body = { ...bookInfo, cover: imageID };
            const res = await axios.post(`${backEndURL}/books/`, body, {
                headers: {
                    'Authorization': `Bearer ${authContext.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            console.log("Book Created !!! ", res.data);
            console.log(res.data.id);
            setModalData({ ...modalData, url: `/book/${res.data.id}` })
            setIsOpen(true)

        } catch (err) {
            console.log(err, "Book Creation Error");
            // Display some popup or modal saying that something is wrong 
            // history.push("/404");
        }

        return false;
    }

    const handleImageChange = e => {
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) == 'image') {
            setImage(file);
        } else {
            setImage(null);
        }
        console.log("image set");

    }

    const sendImage = async e => {
        if (!image) { return {}; }

        let formData = new FormData();
        formData.append("cover", image);

        const res = await fetch(`${backEndURL}/uploadFile`, {
            method: "POST",
            body: formData,
        })
        const resBody = await res.json()
        console.log(resBody);
        return resBody
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

                <form className="cb__form" onSubmit={handleSubmit}>
                    <p className="cb__form-title">FORM</p>

                    <label className="btn cb__form-button" htmlFor="file-input">Choose Cover Image</label>
                    <input className="cb__form-input" type="file" id="file-input" name="cover" onChange={(e) => handleImageChange(e)}></input>

                    <label htmlFor="title">TITLE</label>
                    <input className="cb__form-input" type="text" name="title" value={bookInfo.title} onChange={handleInputChange('title')} required></input>

                    <label htmlFor="author">AUTHOR</label>
                    <input className="cb__form-input" type="text" name="author" value={bookInfo.author} onChange={handleInputChange('author')} required></input>

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
                    <input className="cb__form-input cb__form-input--date" type="number" name="publishdate" value={bookInfo.publishdate} min="1970" max={curYear} onChange={handleInputChange('publishdate')} required></input>

                    <label htmlFor="listed">VISIBILITY</label>
                    <input className="cb__form-input cb__form-input--visibility" type="checkbox" name="listed" id="listed" checked={bookInfo.listed} onChange={handleInputChange('listed')} value="Book is Visible"></input>

                    <label htmlFor="copies">NUMBER OF COPIES</label>
                    <input className="cb__form-input cb__form-input--copies" type="number" name="copies" min="0" value={bookInfo.copies} onChange={handleInputChange('copies')} required></input>

                    <label htmlFor="description">DESCRIPTION</label>
                    <textarea className="cb__form-input cb__form-input--desc" type="text" name="description" value={bookInfo.description} onChange={handleInputChange('description')} required></textarea>

                    <input className="btn cb__form-button" value="Create Book" type="submit" />
                </form>
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} onStateClear={stateClear} modalData={{ ...modalData }} />
        </div>
    )
}

export default CreateBookPage
