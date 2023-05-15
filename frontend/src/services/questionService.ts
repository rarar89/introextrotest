import { API_ROUTE } from "../config";
import { Question } from "../types/question";
import apiClient from "./apiClient";

export const getQuestionById = async (id: number): Promise<Question> => {

    const response = await apiClient.get<Question>(`${API_ROUTE}/question/${id}`);

    if (!response.data) {
        throw new Error('Question not found')
    }

    return response.data;
}