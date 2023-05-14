import { Answer } from "./answer.interface";

export interface Question {
  id: number;
  text: string;
  answers?: Answer[]
  totalQuestions?: number,
}