import { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router";
import CommentCard from "./CommentCard";
import { InnerStorage } from '../contexts/AuthContext';
import { CommentsContext } from "../contexts/CommentsContext";

const CommentSection = ({ bookId }) => {

    const authContext = useContext(InnerStorage);
    // const [comments, setComments] = useState([])
    const { backEndURL } = authContext;
    const history = useHistory();
    const { comments, fetchComments } = useContext(CommentsContext)
    // console.log(comments);

    useEffect(() => {
        fetchComments(bookId)
    }, [history, authContext.isLoggedIn, authContext.token])

    // console.log("comments", comments);

    return (
        <div className="comments">
            {comments.length > 0 ?
                comments.map(c => <CommentCard
                    key={c.id}
                    commentId={c.id}
                    body={c.comment}
                    OP={{
                        id: c.users_id,
                        username: c.username,
                        avatar: c.avatar,
                    }} />
                )
                :
                "No comments yet..."
            }
        </div>
    )
}

export default CommentSection
