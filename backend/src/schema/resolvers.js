const { GraphQLError } = require('graphql');
const Post = require('../models/Post');

const resolvers = {
  Query: {
    posts: async () => {
      return Post.find().sort({ createdAt: -1 });
    },
    post: async (_parent, { id }) => {
      return Post.findById(id);
    },
  },
  Mutation: {
    addPost: async (_parent, { input }) => {
      const { title, content, author } = input;

      if (!title.trim() || !content.trim()) {
        throw new GraphQLError('Title and content cannot be empty', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const post = new Post({ title, content, author });
      return post.save();
    },
    deletePost: async (_parent, { id }) => {
      const result = await Post.findByIdAndDelete(id);
      return Boolean(result);
    },
  },
  Post: {
    id: (post) => post._id.toString(),
    createdAt: (post) => post.createdAt.toISOString(),
    updatedAt: (post) => post.updatedAt.toISOString(),
  },
};

module.exports = resolvers;
