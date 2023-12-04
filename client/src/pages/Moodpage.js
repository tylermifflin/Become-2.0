import React from 'react';
import MoodForm from '../components/Moodform';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_MOODS, QUERY_ME } from '../utils/queries';
import { REMOVE_MOOD } from '../utils/mutations';

const MoodPage = () => {
    const { loading, data } = useQuery(QUERY_MOODS);
    const [deleteMood] = useMutation(REMOVE_MOOD);
    
    const handleDelete = async (moodId) => {
        try {
        await deleteMood({
            variables: { moodId },
            refetchQueries: [{ query: QUERY_MOODS }, { query: QUERY_ME }],
        });
        } catch (e) {
        console.error(e);
        }
    };
    
    return (
        <div className='notHome'>
        <MoodForm />
        <div>
            <h3>Current Moods:</h3>
            {loading ? (
            <p>Loading...</p>
            ) : (
            <ul>
                {data.moods.map((mood) => (
                <li key={mood._id}>
                    <p>Mood: {mood.moodText}</p>
                    <p>Thought: {mood.thought}</p>
                    <p>Created On: {mood.createdAt}</p>
                    <button onClick={() => handleDelete(mood._id)}>Delete</button>
                </li>
                ))}
            </ul>
            )}
        </div>
        </div>
    );
    };

export default MoodPage;