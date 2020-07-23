const { gql } = require('apollo-server-express');

const messageGQL = gql`
    type Message {
        id: ID
        userId: String
        text: String
        timestamp: String
        fromYou: Boolean
        user: User
    }
`;

class Message {
  constructor(id, userId, text, { timestamp = null, fromYou = false, user = null } = null) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.timestamp = timestamp;
    this.fromYou = fromYou;
    this.user = user;
  }
}

module.exports = { messageGQL, Message };
