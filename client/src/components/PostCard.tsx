import dayjs from "dayjs";
import dayjsRelative from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(dayjsRelative);

interface PostCardProps {
    post: Record<string, any>;
}

const PostCard = ({ post }: PostCardProps) => {
    return (
        <article>
            <h2>{post.body}</h2>
            <p>
                by {post.author.username} at {dayjs(post.createdAt).fromNow()}
            </p>
            <p>{post.body}</p>
            <Link to={`/post/${post.id}`}>Go to Post</Link> |{" "}
            <button>Like {post.likeCount}</button> |{" "}
            <button>Comment {post.commentCount}</button>
        </article>
    );
};

export default PostCard;
