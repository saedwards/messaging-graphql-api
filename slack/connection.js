const { WebClient } = require('@slack/web-api');
const { SocketModeClient } = require('@slack/socket-mode');
const { PubSub } = require('graphql-subscriptions');

let webAPI, socketModeClient;

const pubsub = new PubSub();

async function connect ({ appToken, botToken }) { // <-- Destructure new tokens
  console.log('appToken', appToken);
  console.log('botToken', botToken);

  webAPI = new WebClient(botToken);
  socketModeClient = new SocketModeClient({
    appToken
  }); // <-- Create new RTMClient instance with new token

  await socketModeClient.start(); // <-- Boot SocketModeClient
}

function getConnection() {
  if(!webAPI || !socketModeClient) {
    throw Error('Slack connections not found');
  }

  return { webAPI, socketModeClient };
}

module.exports = { connect, getConnection, pubsub };
