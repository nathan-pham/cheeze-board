import { useQuery, gql } from "@apollo/client";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import Posts from "../components/Posts";
import PostForm from "../components/PostForm";
import Footer from "../components/Footer";

import { FETCH_POSTS_QUERY } from "../utils/queries";

const Home = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    const { user } = useContext(AuthContext);

    return (
        <>
            {user && (
                <>
                    <h1>Make a Post</h1>
                    <PostForm />
                </>
            )}
            <h1>Recent Posts</h1>
            <Posts loading={loading} posts={data?.getPosts} />
            <Footer />
        </>
    );
};

export default Home;
