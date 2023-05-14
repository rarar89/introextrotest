import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Question from './Question';

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/question/:id" element={<Question />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
