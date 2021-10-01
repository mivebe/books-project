import { useState, useEffect, useContext } from "react"
import { InnerStorage } from "../contexts/AuthContext"
import { ReactComponent as AuthorPlaceholder } from "../media/icons/author-placeholder.svg"
import { ReactComponent as BookPlaceholder } from "../media/icons/book-placeholder.svg"

const Traffic = () => {

    const authContext = useContext(InnerStorage)
    const { backEndURL } = authContext;

    const MRBDescription = "Book Description";
    const MRBName = "Most Rented Book Name";
    const MRBCover = "COVER";
    const MRADescription = "Author Description";
    const MRAName = "Most Rented Author Name"
    const MRAImage = "IMAGE";
    const RentedNowDescription = "Rented Now Description";
    const RentedNowImage = "IMAGE";
    const RentedNowName = "Books Rented Now"

    const [traffic, setTraffic] = useState(null)

    useEffect(() => {
        (async () => {
            const res = await fetch(`${backEndURL}/books/traffic`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${authContext.token}`,
                }
            })
            const result = await res.json()
            setTraffic(result)
            console.log("result", result);
        })()
    }, [])



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
                                <img src={`${backEndURL}/static/${traffic && traffic?.mostRentedBooks[0]?.cover}`}
                                    alt="Most rented book cover"
                                    style={{ display: "block", margin: "auto" }} />
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
                                <a href="#popup" className="btn btn--white">Rent now!</a>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-1-of-3">
                    <div className="card">
                        <div className="card__side card__side--front">
                            <div className="card__picture" >
                                <AuthorPlaceholder />
                            </div>
                            <h4 className="card__heading">
                                <span className="card__heading-span card__heading-span--2">{traffic && traffic?.mostRentedAuthors[0]?.author}</span>
                            </h4>
                            <div className="card__details">
                                <p className="most-rented-description">{`Rented ${traffic && traffic?.mostRentedAuthors[0]?.topAuthors} times`}</p>
                            </div>

                        </div>
                        <div className="card__side card__side--back card__side--back-2">
                            <div className="card__cta">
                                <div className="card__price-box">
                                    <p className="card__price-only">Times Rented</p>
                                    <p className="card__price-value">{traffic && traffic?.mostRentedAuthors[0]?.topAuthors}</p>
                                </div>
                                <a href="#popup" className="btn btn--white">Rent now!</a>
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
                                    <p className="card__price-only">Only</p>
                                    <p className="card__price-value">$100</p>
                                </div>
                                <a href="#popup" className="btn btn--white">Rent now!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Traffic
