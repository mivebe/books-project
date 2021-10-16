import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import placeholderAvatar from "../../media/za-warudo.jpg"
import { CommentsContext } from '../../contexts/CommentsContext';

const CommentCard = ({ commentId, body, OP }) => {
    const authContext = useContext(AuthContext);
    const { deleteComment } = useContext(CommentsContext)
    const { backEndURL } = authContext;

    const handleDelete = async () => {
        deleteComment(commentId)
    }

    return (
        <div className='comment' key={commentId} style={{ display: "flex" }}>
            <div className="comment__op-ontainer" >
                <img className="comment__op-avatar" style={{ width: "50px" }}
                    src={OP.avatar ? `${backEndURL}/static/${OP.avatar}` : placeholderAvatar} alt="original poster avatar" />
                <p>{OP.username}</p>
            </div>

            <div className="comment__body">
                <p>{body}</p>
            </div>


            {authContext?.tokenInfo?.role === "admin" &&
                <div className='comment__actions'>
                    <button onClick={handleDelete}>DELETE</button>
                </div>
            }
        </div>
    )
}

export default CommentCard
