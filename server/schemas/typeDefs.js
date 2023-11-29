// set up typeDefs to match the resolvers
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    goals: [Goal]!
    moodhistory: [Mood]!
  }

  type Goal {
    _id: ID
    goalTitle: String
    goalText: String
    createdAt: String
    endDate: String
  }

  type Mood {
    _id: ID
    moodText: String
    moodDate: String
    thought: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    goals(username: String): [Goal]
    goal(goalId: ID!): Goal
    moods(username: String): [Mood]
    mood(moodId: ID!): Mood
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGoal(goalTitle: String!, goalText: String!, endDate: String): Goal
    addMood(moodText: String!, moodDate: String!, thought: String!): Mood
    removeGoal(goalId: ID!): Goal
    removeMood(moodId: ID!): Mood
  }
`;

module.exports = typeDefs;
