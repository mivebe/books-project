import React, { useContext, useRef } from 'react'
import GetRating from "./GetRating"
import { InnerStorage } from "./contexts/AuthContext";
import { useHistory } from 'react-router-dom';

const BookCard = ({ book, returnBook, lastRef }) => {
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;
    const history = useHistory()

    return (
        <div key={book.id} className="book-card" ref={lastRef ? lastRef : null}
            onClick={() => history.push(`/book/${book.id}`)}>
            <div className="bc__left-side">
                <div className="bc__image-container">
                    <img src={`${backEndURL}/static/${book.cover}`} alt='Book cover' />
                </div>

                <div className="bc__rating-container">
                    <p className='bc__rating'><GetRating bookId={book.id} /></p>
                    <p className='bc__copies'><span>Copies: </span>{book.copies}</p>
                </div>
            </div>

            <div className="bc__right-side">
                <div className="bc__info-container">
                    <p className="bc__info-container__title">{book.title}</p>
                    <p className="bc__info-container__by">by</p>
                    <p className="bc__info-container__author">{book.author}</p>
                    <p className="bc__info-container__genre">{book.genre}</p>
                </div>
            </div>


            {returnBook ? <button className="return-button" onClick={() => returnBook(book.id)}>Return this book</button> : null}
        </div>
    )
}

export default BookCard