import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// set auth token in header
const authLink = setContext(() => {
    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});

// graphql endpoint
const httpLink = createHttpLink({
    uri: "/graphql",
});

// create apollo client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
