const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  input AddPostInput {
    title: String!
    content: String!
    author: String
  }

  type Mutation {
    addPost(input: AddPostInput!): Post!
    deletePost(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
