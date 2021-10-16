import { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext"
import { ReactComponent as AuthorPlaceholder } from "../media/icons/author-placeholder.svg"
import { ReactComponent as BookPlaceholder } from "../media/icons/book-placeholder.svg"


const Traffic = () => {
    const history = useHistory()

    const authContext = useContext(AuthContext)
    const { backEndURL } = authContext;
    const RentedNowDescription = "Rented Now Description";


    const [traffic, setTraffic] = useState(null)

    useEffect(() => {
        authContext.token && (async () => {
            console.log(authContext.token);
            const res = await fetch(`${backEndURL}/books/traffic`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${authContext.token}`,
                }
            })
            const result = await res.json()
            setTraffic(result)
            // console.log("result", result);
        })()
    }, [authContext.token])



    return (
        <section className="section-traffic" id="section-traffic">
            <div className="u-center-text u-margin-bottom-big">
                <h2 className="heading-secondary">
                    Our best sellers
                </h2>
            </div>

            <div className="row">
                <div className="col-1-of-3">
                    <div className="card">
                        <div className="card__side card__side--front">

                            <div className="card__picture">
                                {traffic ?
                                    <img src={`${backEndURL}/static/${traffic?.mostRentedBooks[0]?.cover}`}
                                        alt="Most rented book cover"
                                        style={{ display: "block", margin: "auto" }} />
                                    :
                                    <BookPlaceholder />
                                }
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--1">{traffic && traffic?.mostRentedBooks[0]?.title}</span>
                            </h4>
                            <div className="card__details">
                                <p className="most-rented-description">{`Rented ${traffic && traffic?.mostRentedBooks[0]?.rented} times`}</p>
                            </div>
                        </div>
                        <div className="card__side card__side--back card__side--back-1">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">{traffic && traffic?.mostRentedBooks[0]?.description}</p>
                                    <p className="card__price-value">$100</p>
                                </div>
                                <button className="btn btn--white" onClick={() => { history.push(`/book/${traffic && traffic?.mostRentedBooks[0]?.books_id}`) }}>Rent now!</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-1-of-3">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__picture" >
                                {traffic ?
                                    <img src={`${backEndURL}/static/${traffic && traffic?.mostRentedAuthors[0]?.picture}`}
                                        alt="Most rented book cover"
                                        style={{ display: "block", margin: "auto" }} />
                                    :
                                    <AuthorPlaceholder />
                                }
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--2">{traffic && traffic?.mostRentedAuthors[0]?.author}</span>
                            </h4>
                            <div className="card__details">
                                <p className="most-rented-description">{`Rented ${traffic && traffic?.mostRentedAuthors[0]?.timesRented} times`}</p>
                            </div>

                        </div>
                        <div className="card__side card__side--back card__side--back-2">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">Times Rented</p>
                                    <p className="card__price-value">{traffic && traffic?.mostRentedAuthors[0]?.timesRented}</p>
                                </div>
                                <button className="btn btn--white">Rent now!</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-1-of-3">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__picture">
                                <BookPlaceholder />
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--3">{traffic && traffic?.booksInUseCount}</span>
                            </h4>
                            <div className="card__details">
                                <p className="most-rented-description">{RentedNowDescription}</p>
                            </div>

                        </div>
                        <div className="card__side card__side--back card__side--back-3">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">Some of our most Popular Books: </p>
                                    <div className="card__price-only">{traffic && traffic?.mostRentedBooks.map((b, i) => { if (i != 0) { return <p key={i}>{b.title}</p> } })}</div>
                                    <p className="card__price-value">$100</p>
                                </div>
                                <button className="btn btn--white" onClick={() => { history.push("/all-books") }}>Rent now!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Traffic
