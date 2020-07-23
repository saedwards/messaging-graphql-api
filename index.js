const express = require('express');
const http = require('http');
const { ApolloServer, gql} = require('apollo-server-express');

const PORT = process.env.PORT || 4123;
const app = express();
const httpServer = http.createServer(app);

const { messageGQL } = require('./api/messages/message.model');
const { userGQL } = require('./api/users/user.model');

/**
 * Slack
 */
require('./slack/connection').connect({
  webToken: process.env.SLACK_WEB_ACCESS_TOKEN,
  rtmToken: process.env.SLACK_RTM_ACCESS_TOKEN
});

/**
 * Data sources
 */
const ConversationsAPI = require('./api/slack-integration/data-sources/conversations');
const UsersAPI = require('./api/slack-integration/data-sources/users');

/**
 * Resolvers
 */
const messagesResolvers = require('./api/slack-integration/resolvers/messages.resolvers');

const typeDefs = gql`
  type Query {
    messages(max: Int): [Message]
  }

  type Mutation {
    createMessage(text: String): Message
  }

  type Subscription {
    messageAdded: Message
  }

  ${messageGQL}
  ${userGQL}
`;

const dataSources = {
  conversationsAPI: new ConversationsAPI(),
  usersAPI: new UsersAPI()
};

const server = new ApolloServer({
  typeDefs,
  resolvers: messagesResolvers,
  dataSources: () => dataSources,
  playground: {
    settings: {
      "request.credentials": "include"
    }
  },
  context: ({ req, connection }) => {
    if(connection) {
      return {
        ...connection.context,
        dataSources
      };
    }
  }
});

server.installSubscriptionHandlers(httpServer);

server.applyMiddleware({
  app,
  cors: {
    origin: [
      'http://localhost:4200'
    ],
    credentials: true
  }
});

httpServer.listen(PORT, (err) => {
  if (err) {
    throw new Error(err)
  }

  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
