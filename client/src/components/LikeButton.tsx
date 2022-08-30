import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";

interface LikeButtonProps {
    user: Record<string, any>;
    id: string;
    likes: Record<string, any>[];
    likeCount: number;
}

const LikeButton = ({ user, id, likes, likeCount }: LikeButtonProps) => {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        setLiked(
            !!likes?.find((like) => user && like.username === user.username)
        );
    }, [user, likeCount]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {
            postId: id,
        },
    });

    if (user) {
        return (
            <button onClick={() => likePost()}>
                Like {likeCount} {liked ? "(liked)" : ""}
            </button>
        );
    }

    return (
        <Link to="/auth/login">
            <button>Sign into Like</button>
        </Link>
    );
};

export default LikeButton;

const LIKE_POST_MUTATION = gql`
    mutation LikePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;
