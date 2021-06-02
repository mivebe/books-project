import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { InnerStorage } from '../../App';
import axios from "axios";
import placeholderCover from "../../media/grey-book.png"

const Book = ({ id }) => {
    const [book, setBook] = useState({});
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;
    const history = useHistory();

    useEffect(() => {
        (async () => {

            if (!authContext.logged) { history.push('/login') }
            else {
                const res = await fetch(`${backEndURL}/books/${id || "16"}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${authContext.token}`
                    }
                })
                const resAsJson = await res.json();
                setBook(resAsJson[0])
                console.log(resAsJson[0]);
            }
        })()
    }, [history, authContext.isLoggedIn, authContext.token])



    return (
        <div className="book__page">
            <div className="book__container" style={{ display: "flex", flexDirection: "column", fontSize: "5rem" }}>
                <div className="book__cover-container">
                    <img src={book.cover ? `${backEndURL}/static/${book.cover}` : placeholderCover}></img>
                </div>

                <div className="book__info-container">
                    <p className="book__title">{book.title}</p>
                    <p className="book__author">{book.author}</p>
                    <div>
                        <p className="book__genre">{book.genre}</p>
                        <p className="book__publishdate">{book.publishdate}</p>
                        <p className="book__copies">{book.copies}</p>
                        <p className="book__visibility">{book.listed ? "Visible" : "Hidden"}</p>
                    </div>
                </div>

                <div className="book__description-container">
                    <p className="book__description">{book.description}</p>
                </div>

            </div>

        </div>
    )
}

export default Book
