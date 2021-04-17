import React, { useContext } from 'react'
import { useHistory } from "react-router-dom"
import { InnerStorage } from '../../App';

export default function Home() {

    const authContext = useContext(InnerStorage);
    const history = useHistory();

    const MRBDescription = "Book Description";
    const MRBName = "Most Rented Book Name";
    const MRBCover = "COVER";
    const MRADescription = "Author Description";
    const MRAName = "Most Rented Author Name"
    const MRAImage = "IMAGE";
    const RentedNowDescription = "Rented Now Description";
    const RentedNowImage = "IMAGE";
    const RentedNowName = "Books Rented Now"

    return (
        <div className="home">

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
                                <div className="card__picture card__picture--1">
                                    &nbsp;
                                </div>
                                <h4 className="card__heading">
                                    <span className="card__heading-span card__heading-span--1">{MRBName}</span>
                                </h4>
                                <div className="card__details">
                                    <p className="most-rented-description">{MRBDescription}</p>
                                </div>
                            </div>
                            <div className="card__side card__side--back card__side--back-1">
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


                    <div className="col-1-of-3">
                        <div className="card">
                            <div className="card__side card__side--front">
                                <div className="card__picture card__picture--2">
                                    &nbsp;
                                </div>
                                <h4 className="card__heading">
                                    <span className="card__heading-span card__heading-span--2">{MRAName}</span>
                                </h4>
                                <div className="card__details">
                                    <p className="most-rented-description">{MRADescription}</p>
                                </div>

                            </div>
                            <div className="card__side card__side--back card__side--back-2">
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


                    <div className="col-1-of-3">
                        <div className="card">
                            <div className="card__side card__side--front">
                                <div className="card__picture card__picture--3">
                                    &nbsp;
                                </div>
                                <h4 className="card__heading">
                                    <span className="card__heading-span card__heading-span--3">{RentedNowName}</span>
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

            <section className="section-categories">

                <div className="u-center-text u-margin-bottom-big">
                    <h2 className="heading-secondary">
                        Categories
                    </h2>
                </div>

                <div className="row">
                    <div className="col-1-of-4">
                        <div className="category-box">
                            <i className="category-box__icon icon-basic-world"></i>
                            <h3 className="heading-tertiary u-margin-bottom-small">Calassics</h3>
                            <p className="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div className="col-1-of-4">
                        <div className="category-box">
                            <i className="category-box__icon icon-basic-compass"></i>
                            <h3 className="heading-tertiary u-margin-bottom-small">Detective & Mystery</h3>
                            <p className="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div className="col-1-of-4">
                        <div className="category-box">
                            <i className="category-box__icon icon-basic-map"></i>
                            <h3 className="heading-tertiary u-margin-bottom-small">Science Fiction</h3>
                            <p className="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div className="col-1-of-4">
                        <div className="category-box">
                            <i className="category-box__icon icon-basic-heart"></i>
                            <h3 className="heading-tertiary u-margin-bottom-small">Action & Adventure</h3>
                            <p className="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1-of-4">
                        <div className="category-box">
                            <i className="category-box__icon icon-basic-world"></i>
                            <h3 className="heading-tertiary u-margin-bottom-small">Romance</h3>
                            <p className="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div className="col-1-of-4">
                        <div className="category-box">
                            <i className="category-box__icon icon-basic-compass"></i>
                            <h3 className="heading-tertiary u-margin-bottom-small">Comic Book & Novel</h3>
                            <p className="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div className="col-1-of-4">
                        <div className="category-box">
                            <i className="category-box__icon icon-basic-map"></i>
                            <h3 className="heading-tertiary u-margin-bottom-small">Short Stories</h3>
                            <p className="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div className="col-1-of-4">
                        <div className="category-box">
                            <i className="category-box__icon icon-basic-heart"></i>
                            <h3 className="heading-tertiary u-margin-bottom-small">Horror</h3>
                            <p className="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-empty">

                <button className="logout-btn"
                    onClick={() => {
                        document.cookie = "token=;expires=Thu,01 Jan 1970 00:00:00 UTC";
                        document.cookie = "refreshToken=;expires=Thu,01 Jan 1970 00:00:00 UTC";

                        authContext.setToken(null);
                        authContext.setRefreshToken(null)
                        authContext.setLogged(false);

                        history.push("/logout");
                    }}>Logout
                </button>

            </div>

        </div>
    )
}
