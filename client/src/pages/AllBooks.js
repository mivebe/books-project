import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { BooksContext } from '../contexts/BooksContext';
import { InnerStorage } from "../contexts/AuthContext";
import BookCard from "../components/BookCard"

const AllBooks = () => {
    const authContext = useContext(InnerStorage)
    const { backEndURL } = authContext
    const books = useContext(BooksContext)
    const [additionalBooks, setAdditionalBooks] = useState([])
    const [offset, setOffset] = useState(20)


    useEffect(async () => {
        if (!authContext.logged) { history.push('/login') }
        else {
            const res = await fetch(`${backEndURL}/books?offset=${offset}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authContext.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            })
            const books = await res.json();
            setAdditionalBooks(await books);
            // console.log("addition");
        }
    }, [offset])


    const observer = useRef()
    const lastBookElement = useCallback(node => {
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setOffset(offset + 20)
                // console.log("last is seen");
                // console.log(offset);
            }
        })
        if (node) observer.current.observe(node)
    }, []);// eslint-disable-line


    return (
        <div className="all-books-page">
            {books.map((el, i, arr) =>
                arr.length === (i + 1) ?
                    <BookCard key={el.id} book={el} lastRef={lastBookElement} />
                    :
                    <BookCard key={el.id} book={el} />)
            }
            {additionalBooks.length > 0 &&
                additionalBooks.map((el, i, arr) =>
                    arr.length === (i + 1) ?
                        <BookCard key={el.id} book={el} lastRef={lastBookElement} />
                        :
                        <BookCard key={el.id} book={el} />)
            }
        </div>
    )
}

export default AllBooks
