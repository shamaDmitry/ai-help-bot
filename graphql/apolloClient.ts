import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

console.log("BASE_URL", BASE_URL);

const httpLink = createHttpLink({
  uri: `${BASE_URL}/api/graphql`,
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
  mutate: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
