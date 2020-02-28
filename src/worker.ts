import { ApolloServer } from "apollo-server-cloudflare";
import { graphqlCloudflare } from "apollo-server-cloudflare/dist/cloudflareApollo";
import { RedditAPI } from "./datasource";
import { resolvers } from "./resolvers";
import { schema as typeDefs } from "./schema";
import { CloudflareCache } from "./cloudflareCache";
import responseCachePlugin from "apollo-server-plugin-response-cache";

const cache = new CloudflareCache();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    redditApi: new RedditAPI()
  }),
  introspection: true,
  debug: false,
  cache,
  plugins: [responseCachePlugin({ cache })]
});

// Can't use server.listen() because async addEventListener is not supported
addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith(
    //@ts-ignore
    graphqlCloudflare(() => {
      return server.createGraphQLServerOptions(event.request as any);
    })(event.request as any)
  );
});
