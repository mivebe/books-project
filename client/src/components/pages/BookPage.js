import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { InnerStorage } from '../contexts/AuthContext';
import { CommentsProvider } from '../contexts/CommentsContext';
import placeholderCover from "../../media/grey-book.png"
import CommentSection from '../comments/CommentsSection';
import CreateComment from '../comments/CreateComment';
import { ReactComponent as StarIcon } from "../../media/icons/star.svg"
import StarRating from '../StarRating';

const Book = () => {
    const { id } = useParams()
    const [book, setBook] = useState({});
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;
    const history = useHistory();
    const starContainerRef = useRef(null)

    const handleRent = () => {

    }
    const handleReturn = () => {

    }

    // const handleRateChange = (e) => {
    //     console.log(starContainerRef.current);
    //     starContainerRef.current.children.map(c => {
    //         if (c == e.target) {
    //             console.log("ASD");
    //         }
    //     })
    // }

    // useEffect(() => {
    //     const left = document.getElementById("left")
    //     const right = document.getElementById("right")

    //     left.addEventListener("mouseover", handleRateChange)
    //     right.addEventListener("mouseover", handleRateChange)

    //     return () => {
    //         left.removeEventListener("mouseover", handleRateChange)
    //         right.removeEventListener("mouseover", handleRateChange)
    //     }
    // }, [])

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
                    <div>
                        <StarRating bookId={id || 16} />
                        {/* <div ref={starContainerRef}>
                            <span><StarIcon style={{ width: "50px", color: "white" }} /></span>
                            <span><StarIcon style={{ width: "50px", color: "white" }} /></span>
                            <span><StarIcon style={{ width: "50px", color: "white" }} /></span>
                            <span><StarIcon style={{ width: "50px", color: "white" }} /></span>
                            <span><StarIcon style={{ width: "50px", color: "white" }} /></span>
                        </div> */}

                    </div>
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
