import React from 'react'

const CreateBookPage = () => {
    const curYear = new Date().getFullYear();
    console.log(curYear);

    return (
        <div className="cb__page">
            <div className="cb__form-container" style={{ padding: "5rem", fontSize: "2rem" }}>
                <form className="cb__form" style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="cover">COVER</label>
                    <input className="cb__form-input" type="file" name="cover"></input>

                    <label htmlFor="title">TITLE</label>
                    <input className="cb__form-input" type="text" name="title" required></input>

                    <label htmlFor="author">AUTHOR</label>
                    <input className="cb__form-input" type="text" name="author" required></input>

                    <label >GENRE</label>
                    <ul className="cb__form-input">
                        <li >
                            <input type="radio" name="genre" defaultValue="Classics" required></input>
                            <label htmlFor="Classics">Classics</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Detective & Mystery"></input>
                            <label htmlFor="Detective & Mystery">Detective & Mystery</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Science Fiction"></input>
                            <label htmlFor="Science Fiction">Science Fiction</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue=""></input>
                            <label htmlFor="Action & Adventure">Action & Adventure</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Romance"></input>
                            <label htmlFor="Romance">Romance</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Comic Book & Novel"></input>
                            <label htmlFor="Comic Book & Novel">Comic Book & Novel</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Short Stories"></input>
                            <label htmlFor="Short Stories">Short Stories</label>
                        </li>
                        <li>
                            <input type="radio" name="genre" defaultValue="Horror"></input>
                            <label htmlFor="Horror">Horror</label>
                        </li>
                    </ul>


                    <label htmlFor="publishdate">PUBLISHDATE</label>
                    <input className="cb__form-input" type="number" name="publishdate" min="1497" max={curYear} required></input>

                    <input className="cb__form-input" type="checkbox" name="listed" defaultValue="Book is Visible"></input>
                    <label htmlFor="listed">VISIBILITY</label>

                    <label htmlFor="copies">AMMOUNT OF COPIES</label>
                    <input className="cb__form-input" type="text" name="copies" required></input>

                    <label htmlFor="description">DESCRIPTION</label>
                    <input className="cb__form-input" type="text" name="description" required></input>

                    <input type="submit" defaultValue="Create Book"></input>
                </form>
            </div>
        </div>
    )
}

export default CreateBookPage
