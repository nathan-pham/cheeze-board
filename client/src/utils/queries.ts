import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
    query GetPosts {
        getPosts {
            id
            body
            createdAt
            author {
                username
            }

            likes {
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

export const FETCH_POST_QUERY = gql`
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
