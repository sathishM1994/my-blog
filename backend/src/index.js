require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express4');

const connectDB = require('./db');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/blog-app';

async function startServer() {
  await connectDB(MONGODB_URI);

  const app = express();
  app.use(cors());
  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError, error) => {
      if (!formattedError.extensions?.code) {
        console.error(error);
      }
      return formattedError;
    },
  });
  await server.start();

  app.use('/graphql', expressMiddleware(server));

  app.get('/', (_req, res) => {
    res.send('App is running!.');
  });

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`);
  });
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
