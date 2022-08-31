import { FormEvent, useRef } from "react";
import { gql, useMutation } from "@apollo/client";

import { FETCH_POSTS_QUERY } from "../utils/queries";
import clearFormRef from "../utils/clearFormRef";

const PostForm = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        createPost({
            variables: {
                body: formData.get("body"),
            },
        });
    };

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        update(proxy, result) {
            // commit post changes
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            }) as any;

            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [result.data.createPost, ...data.getPosts],
                },
            });

            // reset all inputs
            clearFormRef(formRef);
        },
    });

    return (
        <form onSubmit={onSubmit} ref={formRef}>
            <input
                type="text"
                placeholder="What's happening?"
                name="body"
                required
            />
            <button>Post</button>
        </form>
    );
};

export default PostForm;

const CREATE_POST_MUTATION = gql`
    mutation CreatePost($body: String!) {
        createPost(body: $body) {
            id
            body
            createdAt
            author {
                username
            }

            likeCount
            likes {
                username
            }

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
