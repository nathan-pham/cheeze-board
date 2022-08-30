import { useQuery, gql } from "@apollo/client";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import Footer from "../components/Footer";

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext);

    return (
        <>
            <h1>Recent Posts</h1>
            {user && <PostForm />}
            <Posts loading={loading} posts={data?.getPosts} />
            <Footer />
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
