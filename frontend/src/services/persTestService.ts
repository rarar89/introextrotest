import { API_ROUTE } from "../config";
import { PersTypeResult } from "../types/persType";
import { Question } from "../types/question";
import apiClient from "./apiClient";

export const getTestInfo = async () => {
    const response = await apiClient.get<{totalQuestions: number}>(`${API_ROUTE}/test/info`);
    return response.data;
}

export const getPersonalityType = async (id: number[]) => {

    const stringIds = id.join(',');

    const response = await apiClient.get<PersTypeResult>(`${API_ROUTE}/test/type/${stringIds}`);
    return response.data;
}