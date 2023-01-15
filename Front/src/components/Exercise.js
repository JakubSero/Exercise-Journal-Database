import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md'

function Exercise({ exercise, onDelete, editExercise }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date}</td>
            <td>< MdEdit onClick={ () => editExercise(exercise)}/></td>
            <td>< MdDeleteForever onClick={ () => onDelete(exercise._id)}/></td>
        </tr>
    );
}

export default Exercise;