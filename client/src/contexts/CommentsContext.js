import { useState, createContext } from "react"
// import { InnerStorage } from './contexts/AuthContext';

export const CommentsContext = createContext({})



export const CommentsProvider = ({ children, authContext }) => {
    const [comments, setComments] = useState([])
    // const authContext = useContext(InnerStorage);
    const { backEndURL } = authContext;

    const fetchComments = async (bookId) => {
        const res = await fetch(`${backEndURL}/books/${bookId}/comments`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authContext.token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }

        })
        const result = await res.json();
        console.log(result);
        setComments(result)
        // console.log("result ", result);

    }

    const createComment = async (bookId, message) => {
        const res = await fetch(`${backEndURL}/books/${bookId}/comments`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authContext.token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: message })

        })
        const result = await res.json();
        console.log("result ", result);
        setComments([...comments, result])

    }


    const deleteComment = async (commentId) => {
        await fetch(`${backEndURL}/books/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authContext.token}`,
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }

        })
        setComments(comments.filter(c => c.id !== commentId))
    }

    return (
        <CommentsContext.Provider value={{ comments, fetchComments, createComment, deleteComment }}>
            {children}
        </CommentsContext.Provider>
    )
}

