import { API_ROUTE } from '../config';
import { getQuestionById } from './questionService';
import fetchMock from 'jest-fetch-mock';

// Set up fetch mock
fetchMock.enableMocks();

describe('getQuestionById', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('returns question data when question id is valid', async () => {
    const mockQuestion = {
      id: 1,
      text: 'Sample question',
      answers: [{}, {}, {}, {}]
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockQuestion));

    const result = await getQuestionById(1);

    expect(result).toEqual(mockQuestion);
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(`${API_ROUTE}/question/1`);
  });

  it('throws an error when question id is invalid', async () => {
    fetchMock.mockReject(new Error('Question not found'));

    await expect(getQuestionById(999)).rejects.toThrow('Question not found');
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(`${API_ROUTE}/question/999`);
  });
});