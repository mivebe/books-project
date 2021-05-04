import axios from "axios";
import React, { useState, useContext } from "react";
import "../../styles/csp.css";
import { InnerStorage } from "../../App";

function CreateBookPage() {

    const curYear = new Date().getFullYear();
    const [isMousedOver, setMouseOver] = useState(false);
    const authContext = useContext(InnerStorage);
    const [bookInfo, setBookInfo] = useState({
        title: "",
        author: "",
        genre: "",
        publishdate: "",
        listed: "",
        copies: "",
        description: "",
    });

    const handleInputChange = key => e => setBookInfo({ ...bookInfo, [key]: e.target.value });

    const handleMouseOver = () => {
        setMouseOver(true);
    }

    const handleMouseOut = () => {
        setMouseOver(false);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        console.log(bookInfo);
        const body = { ...bookInfo }

        try {
            const res = await axios.post("http://localhost:3001/books/", body, {
                headers: {
                    'Authorization': `Bearer ${authContext.token}`
                }
            })
            console.log("Book Creation Success", res.data);

            // history.push("/home");
        } catch (err) {
            console.log(err, "Book Creation Error");
            // history.push("/404")
        }

    }


    return (
        <div className="container">
            <h1>
                Hello {bookInfo.title} {bookInfo.author} {bookInfo.genre}
                {bookInfo.publishdate} {bookInfo.listed} {bookInfo.description} {bookInfo.copies}
            </h1>
            <p>{bookInfo.genre}</p>
            <form>
                <input name="title" type="text" value={bookInfo.title} onChange={handleInputChange('title')} placeholder="Title" />
                <input name="author" type="text" value={bookInfo.author} onChange={handleInputChange('author')} placeholder="Author" />
                <input name="genre" type="text" value={bookInfo.genre} onChange={handleInputChange('genre')} placeholder="Genre" />
                <input name="publishdate" type="number" min="1497" max={curYear} value={bookInfo.publishdate} onChange={handleInputChange('publishdate')} placeholder="Publishdate" />
                <input name="listed" type="number" min="0" max="1" value={bookInfo.listed} onChange={handleInputChange('listed')} placeholder="Listed" />
                <input name="copies" type="number" min="0" max="1" value={bookInfo.copies} onChange={handleInputChange('copies')} placeholder="Copies" />
                <input name="description" type="text" value={bookInfo.description} onChange={handleInputChange('description')} placeholder="Description" />
                <button style={{ backgroundColor: isMousedOver ? "black" : "white" }}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    onClick={handleSubmit}
                >Create Book</button>
            </form>
        </div>
    );
}

export default CreateBookPage;