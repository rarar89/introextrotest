import { render, fireEvent, screen } from '@testing-library/react';
import CheckBoxText from '.';

describe('CheckBoxText', () => {
  const mockClick = jest.fn();

    it('should display the correct text', () => {

        render(<CheckBoxText text="Test Text" onClick={mockClick} active={true} />);

        expect(screen.getByText('Test Text')).toBeInTheDocument();
    });

    it('should call onClick when clicked', () => {

        render(<CheckBoxText text="Test Text" onClick={mockClick} active={true} />);

        fireEvent.click(screen.getByRole('checkbox'));

        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('should display checkbox as checked when active is true', () => {

        render(<CheckBoxText text="Test Text" onClick={mockClick} active={true} />);

        expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toEqual(true);
    });

    it('should display checkbox as unchecked when active is false', () => {

        render(<CheckBoxText text="Test Text" onClick={mockClick} active={false} />);
        
        expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toEqual(false);
    });
});