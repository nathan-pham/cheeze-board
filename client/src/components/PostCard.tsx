import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import dayjs from "dayjs";
import dayjsRelative from "dayjs/plugin/relativeTime";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

dayjs.extend(dayjsRelative);

interface PostCardProps {
    post: Record<string, any>;
}

const PostCard = ({ post }: PostCardProps) => {
    const { user } = useContext(AuthContext);

    const commentPost = () => {
        console.log("comment");
    };

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
            | <button onClick={commentPost}>Comment {post.commentCount}</button>{" "}
            |{" "}
            {user?.username == post.author.username && (
                <DeleteButton id={post.id} />
            )}{" "}
            | <Link to={`/post/${post.id}`}>Go to Post</Link>
            <hr />
        </article>
    );
};

export default PostCard;
