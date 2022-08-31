import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY, FETCH_POST_QUERY } from "../utils/queries";

interface DeleteButtonProps {
    postId?: string;
    commentId?: string;
}

const DeleteButton = ({ postId, commentId }: DeleteButtonProps) => {
    const navigate = useNavigate();

    let deleteItem: Function, loading: boolean;
    let type: string;

    // delete comment
    if (postId && commentId) {
        type = "comment";
        [deleteItem, { loading }] = useMutation(DELETE_COMMENT_MUTATION, {
            variables: { postId, commentId },
            update(proxy) {
                const data = proxy.readQuery({
                    query: FETCH_POST_QUERY,
                    variables: {
                        id: postId,
                    },
                }) as any;

                proxy.writeQuery({
                    query: FETCH_POST_QUERY,
                    data: {
                        getPost: {
                            ...data.getPost,
                            comments: data.getPost.comments.filter(
                                (comment: Record<string, any>) =>
                                    comment.id !== commentId
                            ),
                        },
                    },
                });
            },
        });
    } else {
        type = "post";
        [deleteItem, { loading }] = useMutation(DELETE_POST_MUTATION, {
            variables: { postId },
            update(proxy) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                }) as any;

                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: data.getPosts.filter(
                            (post: Record<string, any>) => post.id !== postId
                        ),
                    },
                });

                navigate("/");
            },
        });
    }

    const onClick = () => {
        if (confirm(`Are you sure you want to delete this ${type}?`)) {
            deleteItem();
        }
    };

    return (
        <button onClick={onClick} disabled={loading}>
            Delete
        </button>
    );
};

export default DeleteButton;

const DELETE_POST_MUTATION = gql`
    mutation DeletePost($postId: ID!) {
        deletePost(id: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation DeleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
        }
    }
`;
