const gql = require("graphql-tag");

module.exports = gql`
    type Comment {
        id: ID!
        body: String!
        createdAt: String!
        author: User!
    }

    type Post {
        id: ID!
        body: String!
        createdAt: String!
        author: User!
        comments: [Comment]!
        likes: [User!]!
    }

    extend type Query {
        getPosts: [Post!]!
        getPost(id: ID!): Post!
    }

    extend type Mutation {
        createPost(body: String!): Post!
        deletePost(id: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
`;
