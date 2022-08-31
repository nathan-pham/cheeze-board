import Comment from "./Comment";

interface CommentsProps {
    postId: string;
    comments: Record<string, any>[];
}

const Comments = ({ postId, comments }: CommentsProps) => {
    if (comments.length) {
        return (
            <>
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        postId={postId}
                        comment={comment}
                    />
                ))}
            </>
        );
    }

    return <p>No comments yet.</p>;
};

export default Comments;
