import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../utils/queries";

interface DeleteButtonProps {
    id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
    const navigate = useNavigate();

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: {
            deletePostId: id,
        },
        update(proxy, result) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            }) as any;

            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: data.getPosts.filter(
                        (post: Record<string, any>) => post.id !== id
                    ),
                },
            });

            navigate("/");
        },
    });

    const onClick = () => {
        const confirmation = confirm(
            "Are you sure you want to delete this post?"
        );
        if (confirmation) {
            deletePost();
        }
    };

    return <button onClick={onClick}>Delete</button>;
};

export default DeleteButton;

const DELETE_POST_MUTATION = gql`
    mutation DeletePost($deletePostId: ID!) {
        deletePost(id: $deletePostId)
    }
`;
