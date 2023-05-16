import { API_ROUTE } from '../config';
import { PersType, PersTypeResult } from '../types/persType';
import { getTestInfo, getPersonalityType } from './persTestService';
import fetchMock from 'jest-fetch-mock';

// Set up fetch mock
fetchMock.enableMocks();

describe('getTestInfo', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('returns test info', async () => {
    const mockTestInfo = {
      totalQuestions: 10
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockTestInfo));

    const result = await getTestInfo();

    expect(result).toEqual(mockTestInfo);
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(`${API_ROUTE}/test/info`);
  });
});

describe('getPersonalityType', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('returns personality type based on given ids', async () => {
    const mockPersTypeResult: PersTypeResult = {
      type: PersType.Extrovert
    };

    const testIds = [1, 2, 3];

    fetchMock.mockResponseOnce(JSON.stringify(mockPersTypeResult));

    const result = await getPersonalityType(testIds);

    expect(result).toEqual(mockPersTypeResult);
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(`${API_ROUTE}/test/type/${testIds.join(',')}`);
  });
});