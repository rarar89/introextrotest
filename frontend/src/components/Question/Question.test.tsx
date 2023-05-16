import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Question from './Question';


const queryClient = new QueryClient();

jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    useQuery: () => ({
        isLoading: false,
        error: null,
        data: { id: 2, text: `Mock question 2`, answers: [{ id: 1, text: 'Mock answer' }] }
    })
}));

describe('Question', () => {


    it('should render correct question based on id from useParams', () => {
        const questionId = 2;
    
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter initialEntries={[`/question/${questionId}`]}>
                    <Routes>
                        <Route path="/question/:id" element={<Question />} />
                    </Routes>
                </MemoryRouter>
            </QueryClientProvider>
        );
    
        expect(screen.getByText(`Mock question ${questionId}`)).toBeInTheDocument();
    });

});