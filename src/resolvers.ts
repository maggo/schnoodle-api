import { IResolvers } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import { AllHtmlEntities } from "html-entities";
import { RedditAPI } from "./datasource";

const entities = new AllHtmlEntities();

export const resolvers: IResolvers<
  any,
  { dataSources: { redditApi: RedditAPI } }
> = {
  DateTime: DateTimeResolver,
  Query: {
    comment: async (_, { id }, { dataSources }) => {
      const comment = await dataSources.redditApi.getComment(
        id?.replace(/^t1_/, "")
      );

      // Schnoodle only!
      if (!comment || comment.author !== "SchnoodleDoodleDo") return null;

      return comment;
    },
    comments: async (_, { limit, before, after }, { dataSources }) => {
      return dataSources.redditApi.getComments({ limit, before, after });
    }
  },
  Comment: {
    body: _ => {
      if (!_.body) return null;
      return entities.decode(_.body.trim());
    },
    createdAt: _ => {
      if (isNaN(_.created)) return null;
      return new Date(_.created * 1000);
    },
    updatedAt: _ => {
      const timestamp = _.edited || _.created;

      if (isNaN(timestamp)) return null;
      return new Date(timestamp * 1000);
    },
    permalink: _ => {
      return _.permalink ? `https://www.reddit.com${_.permalink}` : null;
    },
    post: async (_, { id }, { dataSources }) => {
      return dataSources.redditApi.getPost(_.link_id?.replace(/^t3_/, ""));
    }
  }
};
