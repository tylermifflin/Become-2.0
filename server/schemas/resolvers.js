// Purpose: to define the query and mutation functionality to work with the Mongoose models and use them with Apollo Server and GraphQL
const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Mood, } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // set up queries, users will populate goals and moodhistory connected to the user
    users: async () => {
      return User.find().populate('goals moodhistory');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('goals moodhistory');
    },
    goals: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Goal.find(params).sort({ createdAt: -1 });
    },
    goal: async (parent, { goalId }) => {
      return Goal.findOne({ _id: goalId });
    },
   moods: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Mood.find(params).sort({ createdAt: -1 });
    },
    mood: async (parent, { moodId }) => {
      return Mood.findOne({ _id: moodId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('goals moodhistory');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    // set up the mutations to work in typeDefs and the client side
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // set up goal to be created before adding to the user
    addGoal: async (parent, { goalTitle, goalText, endDate }, context) => {
      if (context.user) {
        const goal = await Goal.create({
          goalTitle,
          goalText,
          endDate,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { goals: goal._id } }
        );

        return goal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // set up mood to be created before adding to the user
    addMood: async (parent, { moodText, moodDate, thought }, context) => {
      if (context.user) {
        const mood = await Mood.create({
          moodText,
          moodDate,
          thought,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { moodhistory: mood._id } }
        );

        return mood;
      }
      throw new AuthenticationError('You need to be logged in!');
    }, 
    // set up the ability to remove a goal and remove it from the user's goals array
    removeGoal: async (parent, { goalId }, context) => {
      if (context.user) {
        const goal = await Goal.findOneAndDelete({
          _id: goalId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { goals: goal._id } }
        );

        return goal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // set up the ability to remove a workout and remove it from the user's workouts array, all exercises inside the workout will be removed as well
    removeMood: async (parent, { moodId }, context) => {
      if (context.user) {
        const mood = await Mood.findOneAndDelete({ _id: moodId });
    
        // Remove the workout from the user's workouts array
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { moodhistory: mood._id } }
        );
    
        return mood;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },
};

module.exports = resolvers;
