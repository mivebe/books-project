import ReactDom from 'react-dom'

// const MODAL_STYLES = {
//     fontSize: "3rem",
//     position: 'fixed',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: '#FFF',
//     padding: '50px',
//     zIndex: 1000,
//     height: "50rem",
//     width: "100rem",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
// }

// const OVERLAY_STYLES = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, .6)',
//     zIndex: 1000
// }

export default function Modal({ open, children, onClose, modalData }) {
    if (!open) return null
    const { message, url, image } = modalData

    return ReactDom.createPortal(
        <div className="modal-overlay">
            <div className="modal-container">
                <p className="modal-title">{message}</p>
                <img src={image} alt="Modal Image"></img>
                {children}
                <div className="button-container">
                    <button className="btn btn--green"> <a href={url} >Check It Out</a></button>
                    <button className="btn btn--brown"><a href="/create-book">Create Another</a></button>
                    <button className="btn btn--red" onClick={onClose}>Close Modal</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}


// const Modal = ({ show, handleClose, image, message, url }) => {
//     return (
//         <div onClick={close}>
//             {show &&
//                 <div className="footer__za-warudo">
//                     <p>{message}</p>
//                     <img src={image} alt="Modal Image"></img>
//                     {url && <button><a href={`${url}`}>Check It Out</a></button>}
//                     <button onClick={handleClose}><a href="/create-book">Create Another</a></button>
//                 </div>
//             }
//         </div>

//     );
// }

// export default Modal
