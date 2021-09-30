import { useRef, useState } from "react"
import { useContext } from 'react';
import { CommentsContext } from "../contexts/CommentsContext";

const CreateComment = ({ bookId }) => {

    const { createComment } = useContext(CommentsContext)

    const formRef = useRef(null)
    const inputRef = useRef(null)

    const [message, setMessage] = useState('')

    const handleFormChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = async () => {
        if (!message || message.trim().length <= 3 || message.trim().length >= 200) { return }
        createComment(bookId, message);
        inputRef.current.value = ''
        inputRef.current.focus()
    }

    return (
        <div>
            <form ref={formRef} onChange={handleFormChange} onSubmit={e => e.preventDefault()}>
                <textarea ref={inputRef} style={{ width: '50%', height: '15rem' }} onKeyPress={e => e.key === "Enter" && handleSubmit()} />
            </form>
            <button className="btn" onClick={handleSubmit}>POST</button>
        </div>
    )
}

export default CreateComment
