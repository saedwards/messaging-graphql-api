const { gql } = require('apollo-server-express');

const userGQL = gql`
  type User {
    id: ID
    name: String
    colour: String
    avatarUrl: String
  }
`;

// Missing
class UserModel {
  constructor(id, name, { colour, avatarUrl, team } = {}) {
    this.id = id;
    this.name = name;
    this.colour = colour;
    this.avatarUrl = avatarUrl;
    this.team = team;
  }
}

module.exports = { userGQL, User: UserModel };
