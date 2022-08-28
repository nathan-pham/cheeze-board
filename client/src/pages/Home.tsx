import { useQuery, gql } from "@apollo/client";
import PostCard from "../components/PostCard";
const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    return (
        <>
            <h1>Recent Posts</h1>
            {loading ? (
                <p>Loading Posts...</p>
            ) : (
                data.getPosts.map((post: Record<string, any>) => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </>
    );
};

export default Home;

const FETCH_POSTS_QUERY = gql`
    {
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
