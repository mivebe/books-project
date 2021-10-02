import React, { useState, useEffect, createContext, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { InnerStorage } from "./AuthContext";

export const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext
    const history = useHistory();
    const [booksArray, setBooksArray] = useState([]);
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)

    useEffect(async () => {
        getBooks()
    }, [history, authContext.logged, authContext.token, limit, offset])

    const getBooks = async () => {
        // console.log(limit, offset);
        if (!authContext.logged) { history.push('/login') }
        else {
            const res = await fetch(`${backEndURL}/books?limit=${limit}&offset=${offset}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authContext.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            })
            const newBooks = await res.json();
            // console.log("newBooks", newBooks);
            setBooksArray(booksArray.concat(await newBooks))
        }
    }

    return (
        <BooksContext.Provider value={{ books: booksArray, limit: limit, setLimit: setLimit, offset: offset, setOffset: setOffset }} >
            {children}
        </BooksContext.Provider>
    )
}
