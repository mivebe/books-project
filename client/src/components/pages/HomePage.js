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
            <p className="heading">Home</p>



            <section class="section-traffic" id="section-traffic">
                <div class="u-center-text u-margin-bottom-big">
                    <h2 class="heading-secondary">
                        Our best sellers
                    </h2>
                </div>

                <div class="row">
                    <div class="col-1-of-3">
                        <div class="card">
                            <div class="card__side card__side--front">
                                <div class="card__picture card__picture--1">
                                    &nbsp;
                                </div>
                                <h4 class="card__heading">
                                    <span class="card__heading-span card__heading-span--1">{MRBName}</span>
                                </h4>
                                <div class="card__details">
                                    <p className="most-rented-description">{MRBDescription}</p>
                                    {/* <ul>
                                        <li>3 day tours</li>
                                        <li>Up to 30 people</li>
                                        <li>2 tour guides</li>
                                        <li>Sleep in cozy hotels</li>
                                        <li>Difficulty: easy</li>
                                    </ul> */}
                                </div>
                            </div>
                            <div class="card__side card__side--back card__side--back-1">
                                <div class="card__cta">
                                    <div class="card__price-box">
                                        <p class="card__price-only">Only</p>
                                        <p class="card__price-value">$100</p>
                                    </div>
                                    <a href="#popup" class="btn btn--white">Rent now!</a>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-1-of-3">
                        <div class="card">
                            <div class="card__side card__side--front">
                                <div class="card__picture card__picture--2">
                                    &nbsp;
                                </div>
                                <h4 class="card__heading">
                                    <span class="card__heading-span card__heading-span--2">{MRAName}</span>
                                </h4>
                                <div class="card__details">
                                    <p className="most-rented-description">{MRADescription}</p>
                                    {/* <ul>
                                        <li>7 day tours</li>
                                        <li>Up to 40 people</li>
                                        <li>6 tour guides</li>
                                        <li>Sleep in provided tents</li>
                                        <li>Difficulty: medium</li>
                                    </ul> */}
                                </div>

                            </div>
                            <div class="card__side card__side--back card__side--back-2">
                                <div class="card__cta">
                                    <div class="card__price-box">
                                        <p class="card__price-only">Only</p>
                                        <p class="card__price-value">$100</p>
                                    </div>
                                    <a href="#popup" class="btn btn--white">Rent now!</a>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-1-of-3">
                        <div class="card">
                            <div class="card__side card__side--front">
                                <div class="card__picture card__picture--3">
                                    &nbsp;
                                </div>
                                <h4 class="card__heading">
                                    <span class="card__heading-span card__heading-span--3">{RentedNowName}</span>
                                </h4>
                                <div class="card__details">
                                    <p className="most-rented-description">{RentedNowDescription}</p>
                                    {/* <ul>
                                        <li>5 day tours</li>
                                        <li>Up to 15 people</li>
                                        <li>3 tour guides</li>
                                        <li>Sleep in provided tents</li>
                                        <li>Difficulty: hard</li>
                                    </ul> */}
                                </div>

                            </div>
                            <div class="card__side card__side--back card__side--back-3">
                                <div class="card__cta">
                                    <div class="card__price-box">
                                        <p class="card__price-only">Only</p>
                                        <p class="card__price-value">$100</p>
                                    </div>
                                    <a href="#popup" class="btn btn--white">Rent now!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section class="section-categories">

                <div class="row">
                    <div class="col-1-of-4">
                        <div class="category-box">
                            <i class="category-box__icon icon-basic-world"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Calassics</h3>
                            <p class="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div class="col-1-of-4">
                        <div class="category-box">
                            <i class="category-box__icon icon-basic-compass"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Detective & Mystery</h3>
                            <p class="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div class="col-1-of-4">
                        <div class="category-box">
                            <i class="category-box__icon icon-basic-map"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Science Fiction</h3>
                            <p class="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div class="col-1-of-4">
                        <div class="category-box">
                            <i class="category-box__icon icon-basic-heart"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Action & Adventure</h3>
                            <p class="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-1-of-4">
                        <div class="category-box">
                            <i class="category-box__icon icon-basic-world"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Romance</h3>
                            <p class="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div class="col-1-of-4">
                        <div class="category-box">
                            <i class="category-box__icon icon-basic-compass"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Comic Book & Novel</h3>
                            <p class="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div class="col-1-of-4">
                        <div class="category-box">
                            <i class="category-box__icon icon-basic-map"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Short Stories</h3>
                            <p class="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>

                    <div class="col-1-of-4">
                        <div class="category-box">
                            <i class="category-box__icon icon-basic-heart"></i>
                            <h3 class="heading-tertiary u-margin-bottom-small">Horror</h3>
                            <p class="category-box__text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, ipsum sapiente aspernatur.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

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
    )
}
