import React, { useState, useEffect, createContext, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { InnerStorage } from "./AuthContext";

export const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext
    const history = useHistory();
    const [booksArray, setBooksArray] = useState([]);
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)
    const [total, setTotal] = useState(100)

    useEffect(async () => {
        if (booksArray.length >= total) { return }
        getBooks()
    }, [history, authContext.logged, authContext.token, limit, offset, search, category])

    const getBooks = async () => {
        if (!authContext.logged) { history.push('/login') }
        else {
            const res = await fetch(`${backEndURL}/books?search=${search}&category=${category}&limit=${limit}&offset=${offset}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authContext.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            })
            const { books, total } = await res.json();
            setTotal(total)
            setBooksArray(booksArray.concat(books))
        }
    }

    return (
        <BooksContext.Provider value={{
            books: booksArray,
            search: search,
            setSearch: setSearch,
            category: category,
            setCategory: setCategory,
            limit: limit,
            setLimit: setLimit,
            offset: offset,
            setOffset: setOffset,
            total: total,
            setTotal: setTotal
        }} >
            {children}
        </BooksContext.Provider>
    )
}
