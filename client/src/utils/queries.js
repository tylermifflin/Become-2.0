import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      goals {
        _id
        goalTitle
        goalText
        createdAt
        endDate
      }
      moodhistory {
        _id
        moodText
        moodDate
        thought
    }
  }
}
`;

export const QUERY_GOALS = gql`
  query goals($username: String) {
    goals(username: $username) {
      _id
      goalTitle
      goalText
      createdAt
      endDate
    }
  }
`;

export const QUERY_SINGLE_GOAL = gql`
  query goal($goalId: ID!) {
    goal(goalId: $goalId) {
      _id
      goalTitle
      goalText
      createdAt
      endDate
    }
  }
`;

export const QUERY_MOODS = gql`
  query moods($username: String) {
    moods(username: $username) {
      _id
      moodText
      moodDate
      thought
    }
  }
`;

export const QUERY_SINGLE_MOOD = gql`
  query mood($moodId: ID!) {
    mood(moodId: $moodId) {
      _id
      moodText
      moodDate
      thought
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      goals {
        _id
        goalTitle
        goalText
        createdAt
        endDate
      }
      moodhistory {
        _id
        moodText
        moodDate
        thought
      }
    }
  }
`;
