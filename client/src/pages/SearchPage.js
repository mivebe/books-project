import { useState, useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { InnerStorage } from "../contexts/AuthContext"

const SearchPage = () => {
    //useLocation returns an object with three key/value pairs one of which is "search"
    // "search" has a type of string and value "?search='whatever you searched'" therefore i substring it to get only the query
    const searchQuery = useLocation().search.substring(8)
    const [searchResult, setSearchResult] = useState([])
    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext

    useEffect(() => {
        console.log(searchQuery);
    }, [])

    useEffect(async () => {
        const res = await fetch(`${backEndURL}/books?q=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authContext.token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        const result = await res.json();
        setSearchResult(await result)
    }, [searchQuery, authContext.token])

    return (
        <div className="all-books-page">
            {searchResult.map(el => <BookCard key={el.id} book={el} />)}
        </div>
    )
}

export default SearchPage
