import { useCallback, useContext, useRef } from 'react'
import { BooksContext } from '../contexts/BooksContext';
import BookCard from "../components/BookCard"

const AllBooks = () => {
    const { books, offset, limit, setOffset } = useContext(BooksContext)

    const observer = useRef()
    const lastBookElement = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setOffset(offset + limit)
            }
        })

        if (node) observer.current.observe(node)
    }, [books]);

    return (
        <div className="all-books-page">
            {books ?
                books.map((e, i, arr) => <BookCard key={e.id} book={e} lastRef={i + 1 === arr.length ? lastBookElement : null} />)
                :
                "Loading..."
            }
        </div>
    )
}

export default AllBooks
