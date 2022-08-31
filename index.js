require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");
const {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");

const mongoose = require("mongoose");
const gql = require("graphql-tag");

const express = require("express");
const http = require("http");
const path = require("path");

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

const startApolloServer = async (port = 5500) => {
    const app = express();

    const httpServer = http.createServer(app);
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });

    // connect to database
    await mongoose.connect(
        `mongodb+srv://phamn23:${process.env.MONGO_PASSWORD}@cluster0.idsmesd.mongodb.net/?retryWrites=true&w=majority`
    );

    // start apollo server
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    // serve react app
    app.use(express.static("./client/dist"));
    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "./client/dist/index.html"));
    });

    httpServer.listen({ port }, () => {
        console.log(
            `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
        );
    });
};

startApolloServer();
