import { useContext, useEffect, useState } from 'react'
import { BooksContext } from '../contexts/BooksContext';
import { InnerStorage } from "../contexts/AuthContext";
import BookCard from "../BookCard"

const AllBooks = () => {
    const books = useContext(BooksContext)

    console.log(books);


    return (
        <div className="all-books-page">
            {books.map(el => <BookCard key={el.id} book={el} />)}
        </div>
    )
}

export default AllBooks
