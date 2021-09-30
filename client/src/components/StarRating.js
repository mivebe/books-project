import { useRef, useState, useContext } from "react";
import { ReactComponent as StarIcon } from "../media/icons/star.svg";
import { InnerStorage } from './contexts/AuthContext';


const StarRating = ({ bookId }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const starRatingRef = useRef(null);

    const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;

    const handleRate = async () => {
        let rating = 0
        for (let c of starRatingRef?.current?.children) {
            c.className === "on" && rating++;
        }
        // console.log(rating);

        const res = await fetch(`${backEndURL}/books/${bookId}/rate`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${authContext.token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rate: rating })
        })
        await res && console.log("rate colected");
    }

    return (
        <div className="star-rating" style={{ display: "flex" }}>
            <div ref={starRatingRef} className="stars-container">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="star-button"
                            key={index}
                            className={index <= (hover || rating) ? "on" : "off"}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star">&#9733;</span>
                            {/* <span className="star"><StarIcon style={{ width: "50px", color: "white" }} /></span> */}
                        </button>
                    );
                })}
            </div>
            <button className='btn' onClick={handleRate}>Rate</button>
        </div>
    );
};

export default StarRating;