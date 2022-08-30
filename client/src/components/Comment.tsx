import dayjs from "dayjs";

interface CommentProps {
    comment: Record<string, any>;
}

const Comment = ({ comment }: CommentProps) => {
    return (
        <>
            <h2>{comment.body}</h2>
            <p>
                Commented by {comment.author.username} at{" "}
                <time>{dayjs(comment.createdAt).fromNow()}</time>
            </p>
        </>
    );
};

export default Comment;
