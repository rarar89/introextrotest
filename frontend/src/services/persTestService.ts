import { API_ROUTE } from "../config";
import { PersTypeResult } from "../types/persType";

export const getTestInfo = async () => {

    const response = await fetch(`${API_ROUTE}/test/info`);

    const dataJson = await response.json();

    return dataJson as {totalQuestions: number};
}

export const getPersonalityType = async (id: number[]) => {

    const stringIds = id.join(',');

    const response = await fetch(`${API_ROUTE}/test/type/${stringIds}`);

    const dataJson = await response.json();

    return dataJson as PersTypeResult;
}