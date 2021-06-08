import React, { useState, useEffect, createContext, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { InnerStorage } from "./AuthContext";

export const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
    const [booksArray, setBooksArray] = useState([]);
    const authContext = useContext(InnerStorage);
    const history = useHistory();

    useEffect(async () => {
        if (!authContext.logged) { history.push('/login') }
        else {
            const res = await fetch('http://localhost:3001/books', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authContext.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            })
            const books = await res.json();
            setBooksArray(await books)
        }

    }, [history, authContext.logged, authContext.token])

    return (
        <BooksContext.Provider value={booksArray} >
            {children}
        </BooksContext.Provider>
    )
}
