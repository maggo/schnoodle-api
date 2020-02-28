import { gql } from "apollo-server";

export const schema = gql`
  scalar DateTime

  type Comment @cacheControl(maxAge: 60) {
    id: ID!
    body: String!
    permalink: String!
    post: Post!
    subreddit: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Post @cacheControl(maxAge: 60) {
    id: ID!
    title: String!
  }

  type Query {
    comment(id: ID!): Comment
    comments(limit: Int = 25, before: ID, after: ID): [Comment]
  }
`;
