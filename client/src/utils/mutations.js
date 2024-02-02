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
  mutation addGoal($goalTitle: String! $goalText: String! $endDate: Date!) {
    addGoal(goalTitle: $goalTitle, goalText: $goalText , endDate: $endDate) {
      _id
      goalTitle
      goalText
      createdAt
      endDate
    }
  }
`;

export const ADD_MOOD = gql`
  mutation addMood($moodText: String! $thought: String!) {
    addMood(moodText: $moodText, thought: $thought) {
      _id
      moodText
      moodDate
      thought
    }
  }
`;

export const REMOVE_GOAL = gql`
  mutation removeGoal($goalId: ID!) {
    removeGoal(goalId: $goalId) {
      _id
      goalText
      createdAt
      endDate
    }
  }
`;

export const REMOVE_MOOD = gql`
  mutation removeMood($moodId: ID!) {
    removeMood(moodId: $moodId) {
      _id
      moodText
      moodDate
      thought
    }
  }
`;





