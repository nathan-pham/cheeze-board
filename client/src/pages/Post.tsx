import { useContext } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../contexts/AuthContext";

import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";

import dayjs from "dayjs";

const Post = () => {
    const params = useParams();
    const context = useContext(AuthContext);
    const { data, loading } = useQuery(POST_QUERY, {
        variables: {
            id: params.id,
        },
    });

    const post = data?.getPost;

    if (loading) {
        return <p>Loading post...</p>;
    } else if (post) {
        return (
            <>
                <h1>{post.body}</h1>
                <p>
                    Posted by <i> {post.author.username}</i>{" "}
                    <time>{dayjs(post.createdAt).fromNow()}</time>
                </p>
                <LikeButton
                    user={context.user}
                    id={post.id}
                    likes={post.likes}
                    likeCount={post.likeCount}
                />{" "}
                |{" "}
                {context.user?.username == post.author.username && (
                    <DeleteButton id={post.id} />
                )}
                <h2>Make a Comment</h2>
                <CommentForm />
                <h2>Comments</h2>
                <Comments comments={post.comments} />
            </>
        );
    }

    return <p>Post not found</p>;
};

export default Post;

const POST_QUERY = gql`
    query GetPost($id: ID!) {
        getPost(id: $id) {
            id
            body
            createdAt
            likeCount
            author {
                username
            }
            likes {
                username
            }
            commentCount
            comments {
                id
                author {
                    username
                }
                createdAt
                body
            }
        }
    }
`;
