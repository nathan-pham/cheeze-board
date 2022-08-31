const gql = require("graphql-tag");

module.exports = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String!

        token: String
    }

    extend type Query {
        user(username: String!): User
        users: [User!]!
    }

    extend type Mutation {
        createUser(
            username: String!
            password: String!
            confirmPassword: String!
            email: String!
        ): User!

        loginUser(username: String!, password: String!): User!
    }
`;
