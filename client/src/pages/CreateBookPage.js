import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { InnerStorage } from "../contexts/AuthContext";
import placeholderBook from "../media/grey-book.png";
import loader from "../media/user-6.jpg";
import Modal from "../components/Modal"
import checkmark from "../media/checkmark.svg.png"
import BookPreview from '../components/BookPreview';

const CreateBookPage = () => {
    const history = useHistory()
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;
    const curYear = new Date().getFullYear();

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalData, setModalData] = useState({
        images: checkmark,
        message: "",
        url: "",
        LBMsg: "Check It Out",
        MBMsg: "Create Anoter",
        RBMsg: "Close",
    });
    const [image, setImage] = useState()
    const [preview, setPreview] = useState(placeholderBook);
    const [isLoading, setIsLoading] = useState()

    const [bookInfo, setBookInfo] = useState({
        cover: "",
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

    // useEffect(() => {
    //     console.log("bookInfo", bookInfo);
    // }, [bookInfo])

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
        setIsModalOpen(false);
    }

    const deleteImage = async (imageID) => {
        const res = await fetch(`${backEndURL}/deleteFile`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${authContext.token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename: imageID }),
        })
        const result = await res.json()
        console.log("deleteRes", result);
        return result
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { imageID } = await sendImage();
            if (!imageID) {
                console.log('did not create book because of no image');
                return false;
            }
            // let formData = new FormData();
            // formData.append("cover", image);

            const body = { ...bookInfo, cover: imageID };
            const res = await axios.post(`${backEndURL}/books/`, body, {
                headers: {
                    'Authorization': `Bearer ${authContext.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            console.log("res", res);
            let deleteMessages
            if (res?.data?.warnings) {
                const { messages } = await deleteImage(imageID)
                deleteMessages = messages
            }
            setModalData({
                ...modalData,
                images: `${backEndURL}/static/${res.data.data.book.cover}`,
                url: `/book/${res.data.data.book.id}`,
                message: res?.data?.messages ? res.data.messages.concat(deleteMessages) : res.data.warnings.concat(deleteMessages)
            })
            setIsModalOpen(true)

        } catch (err) {
            console.log(err, "Book Creation Error");
            deleteImage()

            setModalData({ ...modalData, message: err })
            setIsModalOpen(true)
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
            <BookPreview
                preview={preview}
                book={bookInfo}
                isLoading={isLoading}
                loader={loader}
            />

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
            <Modal
                open={isModalOpen}
                onRightBtn={() => setIsModalOpen(false)}
                onMiddleBtn={stateClear}
                onLeftBtn={() => history.push(modalData.url)}
                modalData={modalData}
            />
        </div>
    )
}

export default CreateBookPage
