import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Answer, Question as QuestionType } from '../../types/question';
import { getQuestionById } from '../../services/questionService';
import { DefaultButton } from '../common/Button/Default';
import ContentWrap from '../common/ContentWrap';
import CheckBoxText from '../common/CheckBoxText';
import { LOCAL_STORAGE_KEY } from '../../config';

type Params = {
    totalQuestions?: number
}

export default function Question ({ totalQuestions } : Params) {

    const { id } = useParams();
    const navigate = useNavigate();

    const questionId = parseInt(id ?? '');
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

    const { isLoading, error, data } = useQuery<QuestionType, Error>({
        queryKey: [`question`, id],
        queryFn: () => getQuestionById(questionId)
    });
    

    useEffect(() => {

        const answers = localStorage.getItem(LOCAL_STORAGE_KEY);

        if(!answers) {

            const answerArray = Array(5);

            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(answerArray));
            setSelectedAnswers(answerArray)
            return;
        }

        const answersArray = JSON.parse(answers);

        if(answersArray.length === 5) {
            setSelectedAnswers(answersArray);
        }
        
        
    }, []);

    const previousClickHandler = () => {

        navigate('/question/' + ( questionId - 1 ))
    }

    const nextClickHandler = () => {

        navigate('/question/' + ( questionId + 1 ))
    }

    const finishClickHandler = () => {

        //wip: verify if all answered

        navigate('/results/');
    }

    const selectAnswer = (answer: Answer) => {

        let selectedAnswersNew = [...selectedAnswers]
        selectedAnswersNew[questionId-1] = answer.id;

        setSelectedAnswers(selectedAnswersNew);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedAnswersNew));
    }  

    const isSelectedAnswer = (answer: Answer) => (selectedAnswers.includes(answer.id));

    return <ContentWrap>
        <h1 className='text-2xl font-bold'>{data?.text}</h1>
        <div>
            {data?.answers?.map((a, i)=><div key={i}><CheckBoxText active={isSelectedAnswer(a)} text={a.text} onClick={()=>selectAnswer(a)} /></div>)}
        </div>
        <div className='flex justify-end'>
            <div className='p-2'><DefaultButton onClick={previousClickHandler} disabled={questionId <= 1}>Previous</DefaultButton></div>
            <div className='p-2'><DefaultButton onClick={nextClickHandler} disabled={questionId >= 5}>Next</DefaultButton></div>
            {questionId >= 5 ? <div className='p-2'><DefaultButton onClick={finishClickHandler}>Finish</DefaultButton></div> : null}
        </div>
    </ContentWrap>;
}