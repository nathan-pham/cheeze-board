require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const gql = require("graphql-tag");

const { UserTypes, UserQuery, UserMutation } = require("./schema/user");
const { PostTypes, PostQuery, PostMutation } = require("./schema/post");

const typeDefs = gql`
    type Query
    type Mutation

    ${UserTypes}
    ${PostTypes}
`;

const resolvers = {
    Query: {
        ...UserQuery,
        ...PostQuery,
    },
    Mutation: {
        ...UserMutation,
        ...PostMutation,
    },
    Post: {
        commentCount: (post) => post.comments.length,
        likeCount: (post) => post.likes.length,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

mongoose
    .connect(
        `mongodb+srv://phamn23:${process.env.MONGO_PASSWORD}@cluster0.idsmesd.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => server.listen({ port: 5500 }))
    .then(({ url }) => `🚀 Server ready at ${url}`);
