import { useCallback, useContext, useRef } from 'react'
import { BooksContext } from '../contexts/BooksContext';
import BookCard from "../components/BookCard"

const AllBooks = () => {
    const { books, offset, limit, setOffset, total } = useContext(BooksContext)

    const observer = useRef()
    const lastBookElement = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                if (books.length >= total) { return }
                setOffset(offset + limit)
            }
        })
        if (node) observer.current.observe(node)
    }, [books]);

    return (
        <>
            {total && total != 100 && < h1 style={{ textAlign: "center" }} >{total}</h1>}
            <div className="all-books-page">
                {books ?
                    books.map((e, i, arr) => <BookCard key={e.id} book={e} lastRef={i + 1 === arr.length ? lastBookElement : null} />)
                    :
                    "Loading..."
                }
            </div>
        </>
    )
}

export default AllBooks