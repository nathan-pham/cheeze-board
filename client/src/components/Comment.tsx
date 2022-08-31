import dayjs from "dayjs";
import DeleteButton from "./DeleteButton";

interface CommentProps {
    postId: string;
    comment: Record<string, any>;
}

const Comment = ({ postId, comment }: CommentProps) => {
    return (
        <>
            <h2>{comment.body}</h2>
            <p>
                Commented by <i>{comment.author.username}</i>{" "}
                <time>{dayjs(comment.createdAt).fromNow()}</time>
            </p>
            <DeleteButton postId={postId} commentId={comment.id} />
        </>
    );
};

export default Comment;
