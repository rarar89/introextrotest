import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('should render welcome page', () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  const linkElement = screen.getByText(/Are you introvert or extrovert?/i);
  expect(linkElement).toBeInTheDocument();
});
