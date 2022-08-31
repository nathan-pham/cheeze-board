import { Link } from "react-router-dom";
import Signin from "./Signin";

interface CommentButtonProps {
    user: Record<string, any>;
    postHref: string;
    commentCount: number;
}

const CommentButton = ({
    user,
    postHref,
    commentCount,
}: CommentButtonProps) => {
    if (user) {
        return (
            <Link to={postHref}>
                <button>Comment {commentCount}</button>
            </Link>
        );
    }

    return <Signin to="comment" />;
};

export default CommentButton;
