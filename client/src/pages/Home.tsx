import { useQuery, gql } from "@apollo/client";
import PostCard from "../components/PostCard";

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    return (
        <>
            <h1>Recent Posts</h1>
            {loading ? (
                <p>Loading Posts...</p>
            ) : data.getPosts.length ? (
                data.getPosts.map((post: Record<string, any>) => (
                    <PostCard key={post.id} post={post} />
                ))
            ) : (
                <p>No posts found.</p>
            )}
            <footer>
                Made by{" "}
                <a
                    href="https://nathanpham.me"
                    target="_blank"
                    rel="noreferrer"
                >
                    Nathan Pham
                </a>
            </footer>
        </>
    );
};

export default Home;

const FETCH_POSTS_QUERY = gql`
    query GetPosts {
        getPosts {
            id
            body
            createdAt
            author {
                username
            }

            likeCount
            commentCount
            comments {
                id
                body
                author {
                    username
                    createdAt
                }
            }
        }
    }
`;
