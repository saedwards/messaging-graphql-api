const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://slack.com/api/';
  }

  async getUsersInfo(id) {
    const { user } = await this.get('users.info', {
        ttl: 10000,
        user: id,
        token: process.env.SLACK_WEB_ACCESS_TOKEN
      });

    return user;
  }
};
