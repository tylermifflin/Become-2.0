import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_GOAL } from '../../utils/mutations';
import { QUERY_GOALS } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const GoalForm = () => {
  const [goalTitle, setGoalTitle] = useState('');
  const [goalText, setGoalText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const goals = useQuery( QUERY_GOALS);

  const [addGoal, { error }] = useMutation(ADD_GOAL, {
    update(cache, { data: { addGoal } }) {
      try {
        console.log(goals);
        cache.writeQuery({
          query: QUERY_GOALS,
          data: { goals: [addGoal, ...goals.data.goals] }
        });
      } catch (e) {
        console.error(e);
      }
    }
  });

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'goalTitle') {
      setGoalTitle(value);
    } else if (name === 'goalText' && value.length <= 280) {
      setGoalText(value);
      setCharacterCount(value.length);
    }
  }

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addGoal({
        variables: { goalTitle: goalTitle, goalText: goalText}
      });

      setGoalTitle('');
      setGoalText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h3>What is your Goal?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="goalTitle"
                placeholder="Name your goal here..."
                value={goalTitle}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-9">
              <textarea
                name="goalText"
                placeholder="Here's a new goal..."
                value={goalText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-12 col-lg-3">
              <button className="btn btn-block" type="submit">
                Add Goal
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default GoalForm;
