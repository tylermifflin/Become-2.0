import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_MOOD } from '../../utils/mutations';
import { QUERY_MOODS} from '../../utils/queries';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const MoodForm = () => {
    const [moodText, setMoodText] = useState('');
    const [thought, setThought] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const moods = useQuery(QUERY_MOODS);

    const [addMood, { error }] = useMutation(ADD_MOOD, {
        update(cache, { data: { addMood } }) {
            try {
                console.log(moods);
                cache.writeQuery({
                    query: QUERY_MOODS,
                    data: { moods: [addMood, ...moods.data.moods] }
                });
            } catch (e) {
                console.error(e);
            }
        }
    });

    const handleChange = event => {
        const { name, value } = event.target;
        if (name === 'moodText') {
            setMoodText(value);
        } else if (name === 'thought' && value.length <= 280) {
            setThought(value);
            setCharacterCount(value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addMood({
                variables: { moodText: moodText, thought: thought }
            });

            setMoodText('');
            setThought('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    }

// i want the user to be able to select a mood from a dropdown menu and then have the mood be added to the database
// i want the user to be able to type in a thought and have that thought be added to the database
const moodOptions = [ 'blissful', 'happy', 'sad', 'angry', 'anxious', 
'excited', 'tired', 'calm', 'confused', 'frustrated', 'bored', 'lonely', 
'loved', 'grateful', 'hopeful', 'proud', 'motivated', 'inspired','scared', 'stressed', 'overwhelmed', 
'content', 'disappointed', 'embarrassed', 'jealous', 'optimistic', 'pessimistic', 'satisfied' ];

    return (
        <div>
            <h3>How are you feeling today?</h3>

            {Auth.loggedIn() ? (
                <>
               
            <form 
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="moodText">Mood</label>
                    <select className="form-control" id="moodText" name="moodText" onChange={handleChange}>
                        {moodOptions.map((mood) => (
                            <option value={mood}>{mood}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="thought">Thought</label>
                    <textarea className="form-control" name="thought" placeholder="What's on your mind?" value={thought} onChange={handleChange} maxLength="280"></textarea>
                </div>
                <div className="form-group">
                    <button className="btn" type="submit">Submit</button>
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
                    You need to be logged in to share your mood. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default MoodForm;