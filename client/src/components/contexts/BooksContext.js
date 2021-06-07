import React, { useState, useEffect, createContext, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { AuthContext } from './AuthContext.js'

export const BooksContext = createContext()

export const BooksProvider = props => {
    const [books, setBooks] = useState([]);
    const auth = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        if (!auth.isLoggedIn) { history.push('/login') }
        else {
            fetch('http://localhost:3001/books', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }
            )
                .then(res => res.json())
                .then(res => {
                    setBooks(res)
                })

        }
    }, [history, auth.isLoggedIn, auth.token])
    return <BooksContext.Provider value={books}>
        {props.children}
    </BooksContext.Provider>
}
