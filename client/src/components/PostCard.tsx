import dayjs from "dayjs";
import dayjsRelative from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(dayjsRelative);

interface PostCardProps {
    post: Record<string, any>;
}

const PostCard = ({ post }: PostCardProps) => {
    const likePost = () => {
        console.log("like");
    };

    const commentPost = () => {
        console.log("comment");
    };

    return (
        <article>
            <h2>{post.body}</h2>
            <p>
                Posted by {post.author.username}{" "}
                <time>{dayjs(post.createdAt).fromNow()}</time>
            </p>
            <button onClick={likePost}>Like {post.likeCount}</button> |{" "}
            <button onClick={commentPost}>Comment {post.commentCount}</button> |{" "}
            <Link to={`/post/${post.id}`}>Go to Post</Link>
            <hr />
        </article>
    );
};

export default PostCard;
