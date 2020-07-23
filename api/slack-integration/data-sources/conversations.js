const { DataSource } = require('apollo-datasource');
const connection = require('../../../slack/connection');

module.exports = class ConversationsAPI extends DataSource {
  constructor() {
    super();
  }

  /**
   * Get the complete list of conversations associated with your Slack web token
   */
  getConversationsList() {
    const { webAPI } = connection.getConnection();

    return webAPI.conversations.list();
  }

  /**
   * Get the Slack channel we want by 'name' to get associated data such as the
   * channel id
   */
  getConversation(name) {
    return this.getConversationsList()
      .then(res => res.channels.find(channel => channel.name === name));
  }

  /**
   * Get the Slack channel history of messages and limit the amount by the 'max'
   * value
   */
  getConversationsHistory({ id: channelId, max = 10 }) {
    const { webAPI } = connection.getConnection();

    return webAPI.conversations.history({ channel: channelId, limit: max })
      .then(res => res.messages);
  }

  /**
   * Create a Slack channel
   */
  createConversation(name, userIds) {
    const { webAPI } = connection.getConnection();

    return webAPI.conversations.create({ name, user_ids: userIds })
      .then(res => res.channel);
  }

  /**
   * Invite users to a Slack channel
   */
  inviteUser({ channelId, userIds }) {
    const { webAPI } = connection.getConnection();

    return webAPI.conversations.invite({ channel: channelId, users: userIds.join(',') })
      .then(res => res.channel);
  }

  /**
   * Create a message in a channel
   */
  chatPostMessage(channelId, text) {
    const { webAPI } = connection.getConnection();

    return webAPI.chat.postMessage({ channel: channelId, text: text })
      .then(res => res.message);
  }
};
