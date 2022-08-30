import PostCard from "./PostCard";

interface PostsProps {
    loading: boolean;
    posts: Record<string, any>[];
}

const Posts = ({ loading, posts }: PostsProps) => {
    if (loading) {
        return <p>Loading Posts...</p>;
    }

    if (posts.length) {
        return (
            <>
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </>
        );
    }

    return <p>No posts yet.</p>;
};

export default Posts;
