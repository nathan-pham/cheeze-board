import Comment from "./Comment";

interface CommentsProps {
    postId: string;
    username: string;
    comments: Record<string, any>[];
}

const Comments = ({ postId, username, comments }: CommentsProps) => {
    if (comments.length) {
        return (
            <>
                {comments.map((comment) => (
                    <Comment
                        key={comment.id}
                        postId={postId}
                        username={username}
                        comment={comment}
                    />
                ))}
            </>
        );
    }

    return <p>No comments yet.</p>;
};

export default Comments;
