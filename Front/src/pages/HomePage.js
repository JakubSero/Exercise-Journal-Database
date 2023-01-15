import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercise] = useState([]);
    const navigate = useNavigate()

    const onDelete = async id => {
        const response = await fetch(`/exercises/${id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/exercises');
            const exercises = await getResponse.json();
            setExercise(exercises);
        } else {
        console.error(`Failed to delete exercise with id = ${id}, status code = ${response.status}`)
        }
    }

    const editExercise = async exerciseToEdit => {
        setExerciseToEdit(exerciseToEdit);
        navigate('/edit-exercise')
    };

	
    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercise(exercises);
}
	
    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>Exercises Completed</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} editExercise={editExercise}></ExerciseList>
        </>
    );
}

export default HomePage;