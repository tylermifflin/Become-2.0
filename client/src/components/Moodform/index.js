import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_MOOD } from '../../utils/mutations';
import { QUERY_MOODS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const MoodForm = () => {
    // i want the mood to be a dropdown menu with 5 options
    // i want the thought to be a text box

    const [moodText, setMoodText] = useState('');
    const [thought, setThought] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const moods = useQuery(QUERY_MOODS);
    const me = useQuery(QUERY_ME);