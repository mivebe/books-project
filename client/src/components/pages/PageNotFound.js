import React from 'react'
import NotFoundImage from "../../media/404.png"

const PageNotFound = () => {
    return (<div className="nfp">
        <div className="nfp__container" >
            <img className="nfp__image" src={NotFoundImage} alt="404" />
        </div>
    </div>
    )
}
export default PageNotFound