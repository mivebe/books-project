import loader from "../media/user-6.jpg";
const BookPreview = ({ preview, book, isLoading }) => {
    return (
        <div className="cb__preview__container">

            <div className="cb__preview__image-container">
                <img className="cb__preview__image" src={preview} alt="IMAGE"></img>
                {isLoading && <img className="cb__preview__image-loader" src={loader} alt="loading"></img>}
            </div>

            <div className="cb__preview__info-container">
                <p className="cb__preview__title">{book.title || " "}</p>
                <p className="cb__preview__author">{book.author}</p>

                <div className="cb__preview__info-container--secondary">
                    <p className="cb__preview__genre">{book.genre}</p>
                    <p className="cb__preview__publishdate">{book.publishdate}</p>
                    <p className="cb__preview__copies">{book.copies}</p>
                    <p className="cb__preview__visibility">{book.listed ? "Visible" : "Hidden"}</p>
                </div>
            </div>

            <div className="cb__preview__description-container">
                <p className="cb__preview__description">{book.description}</p>
            </div>

        </div>
    )
}

export default BookPreview
