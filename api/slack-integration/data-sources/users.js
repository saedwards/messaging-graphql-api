const connection = require("../../../slack/connection");

module.exports = class UsersAPI {
  async getUsersInfo(id) {
    const { webAPI } = connection.getConnection();

    return webAPI.users.info({
      user: id
    });
  }
};
