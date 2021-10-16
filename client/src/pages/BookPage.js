import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { CommentsProvider } from '../contexts/CommentsContext';
import placeholderCover from "../media/grey-book.png"
import CommentSection from '../components/comments/CommentsSection';
import CreateComment from '../components/comments/CreateComment';
import { ReactComponent as StarIcon } from "../media/icons/star.svg"
import StarRating from '../components/StarRating';
import useBreakpoint from "../components/useBreakpoint";

const Book = () => {
    const { id } = useParams()
    const [book, setBook] = useState({});
    const authContext = useContext(AuthContext);
    const { backEndURL } = authContext;
    const history = useHistory();

    const handleRent = async () => {
        const res = await fetch(`${backEndURL}/books/${id || "16"}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authContext.token}`
            }
        })
        const result = await res.json();
        console.log("In Use Entry", result);

    }
    const handleReturn = async () => {
        const res = await fetch(`${backEndURL}/books/${id || "16"}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authContext.token}`
            }
        })
        const result = await res.json();
        console.log("Deleted In Use Entry", result);
    }

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
                // console.log(resAsJson[0]);
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
            {authContext.logged &&
                <section className="book__actions">
                    <div>
                        <button className='btn' onClick={handleRent}>Rent</button>
                        <button className='btn' onClick={handleReturn}>Return</button>
                    </div>
                    <StarRating bookId={id || 16} />
                </section>
            }

            <section className="comments-container">
                <CommentsProvider authContext={authContext}>
                    <CommentSection bookId={id || 16} />
                    <CreateComment bookId={id || 16} />
                </CommentsProvider>
            </section>

        </div>
    )
}

export default Book
