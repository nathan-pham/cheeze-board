import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import dayjs from "dayjs";
import dayjsRelative from "dayjs/plugin/relativeTime";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CommentButton from "../components/CommentButton";

dayjs.extend(dayjsRelative);

interface PostCardProps {
    post: Record<string, any>;
}

const PostCard = ({ post }: PostCardProps) => {
    const { user } = useContext(AuthContext);
    const postHref = `/post/${post.id}`;

    return (
        <article>
            <h2>{post.body}</h2>
            <p>
                Posted by <i>{post.author.username}</i>{" "}
                <time>{dayjs(post.createdAt).fromNow()}</time>
            </p>
            <LikeButton
                user={user}
                id={post.id}
                likes={post.likes}
                likeCount={post.likeCount}
            />{" "}
            |{" "}
            <CommentButton
                user={user}
                postHref={postHref}
                commentCount={post.commentCount}
            />{" "}
            |{" "}
            {user?.username == post.author.username && (
                <>
                    <DeleteButton postId={post.id} /> |{" "}
                </>
            )}
            <Link to={postHref}>Go to Post</Link>
            <hr />
        </article>
    );
};

export default PostCard;
