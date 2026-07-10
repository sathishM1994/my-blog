import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
      author
      createdAt
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($input: AddPostInput!) {
    addPost(input: $input) {
      id
      title
      content
      author
      createdAt
    }
  }
`;
