import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

/**
 * Create an exercise in the database with the required parameters.
 */
app.post('/exercises', (req, res) => {
    if (req.body.name === null || req.body.name === undefined || typeof req.body.name !== 'string'){
        res.status(400).json({ Error: 'Invalid Request' })
        return
    }
    if (req.body.reps <= 0){
        res.status(400).json({ Error: 'Invalid Request' });
        return
    }
    if (req.body.weight <= 0){
        res.status(400).json({ Error: 'Invalid Request' });
        return
    }
    if (req.body.unit === 'kgs' || req.body.unit === 'lbs'){
        // just need an empty spot because req.body.unit !== 'kgs' did not work here
        // for some reason
    } else {
        res.status(400).json({ Error: 'Invalid Request' })
        return
    }
    if (!isDateValid(req.body.date)){
        res.status(400).json({ Error: 'Invalid Request' })
        return
    }
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' });
        });
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});

/**
 * Retrieve exercises.
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.status(200).send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its values to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    if (req.body.name === null || req.body.name === undefined || typeof req.body.name !== 'string'){
        res.status(400).json({ Error: 'Invalid Request' })
        return
    }
    if (req.body.reps <= 0){
        res.status(400).json({ Error: 'Invalid Request' });
        return
    }
    if (req.body.weight <= 0){
        res.status(400).json({ Error: 'Invalid Request' });
        return
    }
    if (req.body.unit !== 'kgs' && req.body.unit !== 'lbs'){
        res.status(400).json({ Error: 'Invalid Request' })
        return
    }
    if (!isDateValid(req.body.date)){
        res.status(400).json({ Error: 'Invalid Request' })
        return
    }

    let filter = { _id: req.params._id }
    
    let update = { _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date }
    exercises.replaceExercise(filter, update)
        .then(modifiedCount => {
            if (modifiedCount === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById({_id: req.params._id})
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Not found"});
            }
        })
        .catch(error => {
            console.error(error);
            res.status(404).send({ Error: "Not found"});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});