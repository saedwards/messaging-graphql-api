const { WebClient, RTMClient } = require('@slack/client');
const { PubSub } = require('apollo-server');

let webAPI, rtmAPI;

const pubsub = new PubSub();

function connect({ webToken, rtmToken }) { // <-- Destructure new token
  console.log('webToken', webToken);
  console.log('rtmToken', rtmToken);

  webAPI = new WebClient(webToken);
  rtmAPI = new RTMClient(rtmToken); // <-- Create new RTMClient instance with new token

  rtmAPI.start(); // <-- Boot RTMClient
}

function getConnection() {
  if(!webAPI || !rtmAPI) {
    throw Error('Slack connections not found');
  }

  return { webAPI, rtmAPI };
}

module.exports = { connect, getConnection, pubsub };
