import { FormEvent, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

import { FETCH_POST_QUERY } from "../utils/queries";
import clearFormRef from "../utils/clearFormRef";

interface CommentFormProps {
    id: string;
}

const CommentForm = ({ id }: CommentFormProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        createComment({
            variables: {
                postId: id,
                body: formData.get("body"),
            },
        });
    };

    const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            clearFormRef(formRef);
        },
    });

    return (
        <form onSubmit={onSubmit} ref={formRef}>
            <input
                type="text"
                name="body"
                placeholder="What do you think?"
                required
            />
            <button disabled={loading}>Send</button>
        </form>
    );
};

export default CommentForm;

const CREATE_COMMENT_MUTATION = gql`
    mutation CreateComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            body
            createdAt
            comments {
                author {
                    username
                }
                createdAt
                body
                id
            }
            author {
                username
            }
        }
    }
`;
