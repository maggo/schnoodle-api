import { ApolloServer } from "apollo-server";
import { RedditAPI } from "./datasource";
import { resolvers } from "./resolvers";
import { schema as typeDefs } from "./schema";
import responseCachePlugin from "apollo-server-plugin-response-cache";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    redditApi: new RedditAPI()
  }),
  introspection: true,
  tracing: true,
  debug: true,
  plugins: [responseCachePlugin()]
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
