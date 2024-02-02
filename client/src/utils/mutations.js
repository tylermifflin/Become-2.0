import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($goalTitle: String! $goalText: String!) {
    addGoal(goalTitle: $goalTitle, goalText: $goalText) {
      _id
      goalTitle
      goalText
      createdAt
    }
  }
`;

export const ADD_MOOD = gql`
  mutation addMood($moodText: String! $thought: String!) {
    addMood(moodText: $moodText, thought: $thought) {
      _id
      moodText
      thought
      moodDate
    }
  }
`;

export const REMOVE_GOAL = gql`
  mutation removeGoal($goalId: ID!) {
    removeGoal(goalId: $goalId) {
      _id
      goalText
      createdAt
    }
  }
`;

export const REMOVE_MOOD = gql`
  mutation removeMood($moodId: ID!) {
    removeMood(moodId: $moodId) {
      _id
      moodText
      thought
      moodDate
    }
  }
`;





