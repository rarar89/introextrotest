import { LOCAL_STORAGE_KEY } from "../config";

export const verifyAnswers = () => {

    const answers = localStorage.getItem(LOCAL_STORAGE_KEY);

    if(!answers) {
        return false;
    }

    const answersArray = JSON.parse(answers);

    const incompleteAnswers = answersArray.filter((a:number|null)=>!a);

    return incompleteAnswers.length === 0;
}