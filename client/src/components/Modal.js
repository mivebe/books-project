import ReactDom from 'react-dom'

export default function Modal({ open, children, onLeftBtn, onRightBtn, onMiddleBtn, modalData }) {
    if (!open) return null
    const { message, url, images, LBMsg, MBMsg, RBMsg } = modalData
    // console.log("url", url);
    // console.log("message", message);

    return ReactDom.createPortal(
        <div className="modal-overlay">
            <div className="modal-container">

                {message ?
                    Array.isArray(message) ?
                        message.map(m => <p className="modal-title">{m}</p>)
                        :
                        <p className="modal-title">{message}</p>
                    :
                    ''
                }
                {images ?
                    Array.isArray(images) ?
                        images.map(img => <img src={img} alt="Modal Image"></img>)
                        :
                        <img src={images} alt="Modal Image"></img>
                    :
                    ''
                }
                {children}
                <div className="button-container">
                    <button className="btn btn--green" onClick={onLeftBtn}>{LBMsg}</button>
                    <button className="btn btn--brown" onClick={onMiddleBtn}>{MBMsg}</button>
                    <button className="btn btn--red" onClick={onRightBtn}>{RBMsg}</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}