import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Question from './Question';
import { getTestInfo } from '../services/persTestService';
import { PersTestInfo } from '../types/persTest';
import { useQuery } from 'react-query';

function App() {

  const { isLoading, error, data } = useQuery<PersTestInfo, Error>({
      queryKey: [`question`],
      queryFn: () => getTestInfo()
  });

  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/question/:id" element={<Question totalQuestions={data?.totalQuestions} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
