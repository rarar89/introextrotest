import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from '.';

describe('Error', () => {

  it('renders without crashing', () => {

    render(<Error text={null} />);
  });

  it('does not render anything if text is null', () => {

    render(<Error text={null} />);
    
    const alertElement = screen.queryByRole('alert');

    expect(alertElement).toBeNull();
  });

  it('renders with given text', () => {

    const testText = 'Test error message';

    render(<Error text={testText} />);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});