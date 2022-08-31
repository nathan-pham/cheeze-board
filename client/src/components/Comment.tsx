import dayjs from "dayjs";
import DeleteButton from "./DeleteButton";

interface CommentProps {
    postId: string;
    username: string;
    comment: Record<string, any>;
}

const Comment = ({ postId, username, comment }: CommentProps) => {
    return (
        <>
            <h3>{comment.body}</h3>
            <p>
                Commented by <i>{comment.author.username}</i>{" "}
                <time>{dayjs(comment.createdAt).fromNow()}</time>
            </p>
            {username === comment.author.username && (
                <DeleteButton postId={postId} commentId={comment.id} />
            )}
            <hr />
        </>
    );
};

export default Comment;
