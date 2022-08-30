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
