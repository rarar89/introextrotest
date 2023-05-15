import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Question from './Question';
import { getTestInfo } from '../services/persTestService';
import { PersTestInfo } from '../types/persTest';
import { useQuery } from 'react-query';
import Error from './common/Error';
import Results from './Results';

function App() {

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="/results/" element={<Results />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
