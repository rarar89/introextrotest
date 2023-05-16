import { API_ROUTE } from "../config";
import { Question } from "../types/question";

export const getQuestionById = async (id: number): Promise<Question> => {

    const response = await fetch(`${API_ROUTE}/question/${id}`);

    if (!response.ok) {
        throw new Error('Question not found')
    }

    const data = await response.json();

    return data as Question;
}