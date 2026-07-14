const { GraphQLError } = require('graphql');
const Post = require('../models/Post');

function handleMongooseError(err) {
  if (err.name === 'ValidationError') {
    throw new GraphQLError(err.message, { extensions: { code: 'Invalid user' } });
  }
  if (err.name === 'CastError') {
    throw new GraphQLError(`Invalid id: ${err.value}`, { extensions: { code: 'Invalid id' } });
  }
  throw err;
}

const resolvers = {
  Query: {
    posts: async () => {
      try {
        return await Post.find().sort({ createdAt: -1 });
      } catch (err) {
        handleMongooseError(err);
      }
    },
    post: async (_parent, { id }) => {
      let post;
      try {
        post = await Post.findById(id);
      } catch (err) {
        handleMongooseError(err);
      }

      if (!post) {
        throw new GraphQLError('Post not found', { extensions: { code: 'User Not Found' } });
      }
      return post;
    },
  },
  Mutation: {
    addPost: async (_parent, { input }) => {
      const { title, content, author } = input;

      if (!title.trim() || !content.trim()) {
        throw new GraphQLError('Title and content cannot be empty', {
          extensions: { code: 'User input not available' },
        });
      }

      try {
        const post = new Post({ title, content, author });
        return await post.save();
      } catch (err) {
        handleMongooseError(err);
      }
    },
    deletePost: async (_parent, { id }) => {
      try {
        const result = await Post.findByIdAndDelete(id);
        return Boolean(result);
      } catch (err) {
        handleMongooseError(err);
      }
    },
  },
  Post: {
    id: (post) => post._id.toString(),
    createdAt: (post) => post.createdAt.toISOString(),
    updatedAt: (post) => post.updatedAt.toISOString(),
  },
};

module.exports = resolvers;
