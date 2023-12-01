import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_MOOD } from '../../utils/mutations';
import { QUERY_MOODS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const MoodForm = () => {
    const [moodText, setMoodText] = useState('');
    const [thought, setThought] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const moods = useQuery(QUERY_MOODS);
    const me = useQuery(QUERY_ME);

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

            console.log(me);
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, moods: [...me.data.me.moods, addMood] } }
            });
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setMoodText(event.target.value);
            setThought(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

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
            <form onSubmit={handleFormSubmit}>
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
                    <textarea className="form-control" placeholder="What's on your mind?" value={thought} onChange={handleChange} maxLength="280"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="characterCount">Character Count: {characterCount}/280</label>
                    <button className="btn btn-primary btn-block py-3" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}