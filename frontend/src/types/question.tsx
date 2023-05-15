export interface Answer {
    id: number;
    questionId: number;
    text: string;
    introvertScore: number;
    extrovertScore: number;
}

export interface Question {
    id: number;
    text: string;
    answers?: Answer[]
}