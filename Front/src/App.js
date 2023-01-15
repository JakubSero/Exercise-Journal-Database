import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react'
import Navigation from './components/Navigation'

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <header>
        <h1>Exercise Journal</h1>
        <p>Log your workouts and look at previously completed exercises.</p>
        
      </header>
      <Router>
        <div className="App-header">
        <Navigation/>
		    <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}/>
          <Route path="/add-exercise" element={<AddExercisePage />}/>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}/>
		    </Routes>
          </div>
      </Router>
      <footer>© 2022 Jakub Kowalski</footer>
    </div>
  );
}

export default App;