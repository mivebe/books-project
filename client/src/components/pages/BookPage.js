import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { InnerStorage } from '../../App';
import axios from "axios";

const Book = () => {
    const [book, setBook] = useState({});
    const authContext = useContext(InnerStorage);
    const history = useHistory();

    useEffect(() => {
        (async () => {

            if (!authContext.logged) { history.push('/login') }
            else {
                const res = await fetch('http://localhost:3001/books/16', {
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
                    <img src={book.cover}></img>
                </div>

                <div className="book__info-container">
                    <p className="book__title">{book.title}</p>
                    <p className="book__author">{book.author}</p>
                    <div>
                        <p className="book__genre">{book.genre}</p>
                        <p className="book__publishdate">{book.publishdate}</p>
                    </div>
                </div>

                <div className="book__description-container">
                    <p className="book__description">{book.description}</p>
                </div>

            </div>

            <button onClick={() => { history.push('/create-book') }}>CREATE BOOK</button>

        </div>
    )
}

export default Book
