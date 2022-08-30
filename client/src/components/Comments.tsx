import Comment from "./Comment";

interface CommentsProps {
    comments: Record<string, any>[];
}

const Comments = ({ comments }: CommentsProps) => {
    if (comments.length) {
        return (
            <>
                {comments.map((comment) => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </>
        );
    }

    return <p>No comments yet.</p>;
};

export default Comments;
