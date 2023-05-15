import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Answer, Question as QuestionType } from '../../types/question';
import { getQuestionById } from '../../services/questionService';
import { DefaultButton } from '../common/Button/Default';
import ContentWrap from '../common/ContentWrap';
import CheckBoxText from '../common/CheckBoxText';
import { LOCAL_STORAGE_KEY } from '../../config';
import Error from '../common/Error';
import { verifyAnswers } from '../../utils/answers';

const ANSWERS_MISSING_TEXT = 'Please answer all questions!';

type Params = {
    totalQuestions?: number
}

export default function Question ({ totalQuestions } : Params) {

    const { id } = useParams();
    const navigate = useNavigate();

    const questionId = parseInt(id ?? '');

    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [answerError, setAnswerError] = useState<string|null>(null);

    const { isLoading, error, data } = useQuery<QuestionType, Error>({
        queryKey: [`question`, id],
        queryFn: () => getQuestionById(questionId)
    });

    let errorText = '';

    if(answerError) {
        errorText = answerError;
    }

    if(error) {
        errorText = 'An error occured fetching questions!';
    }

    useEffect(() => {

        if(!totalQuestions) {
            return;
        }

        const answers = localStorage.getItem(LOCAL_STORAGE_KEY);

        if(!answers) {

            const answerArray = Array(totalQuestions);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(answerArray));
            setSelectedAnswers(answerArray)
            return;
        }

        const answersArray = JSON.parse(answers);

        if(answersArray.length === totalQuestions) {
            setSelectedAnswers(answersArray);
        }
        
    }, [totalQuestions]);

    const previousClickHandler = () => {

        navigate('/question/' + ( questionId - 1 ))
    }

    const nextClickHandler = () => {

        navigate('/question/' + ( questionId + 1 ))
    }

    const finishClickHandler = () => {

        //wip: verify if all answered

        if(verifyAnswers()) {
            setAnswerError(null);
            navigate('/results/');
        } else {
            setAnswerError(ANSWERS_MISSING_TEXT);
            console.log('error');
        }
    }

    const selectAnswer = (answer: Answer) => {

        let selectedAnswersNew = [...selectedAnswers]
        selectedAnswersNew[questionId-1] = answer.id;

        setSelectedAnswers(selectedAnswersNew);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedAnswersNew));
    }  

    const isSelectedAnswer = (answer: Answer) => (selectedAnswers.includes(answer.id));

    return <ContentWrap>
        <>
            <div className='py-2'><Error text={errorText} /></div>
            {isLoading ? 'loading...' : ''}
            {data ? <>
                <h1 className='text-2xl font-bold'><span className='text-slate-400'>{questionId} / {totalQuestions}</span> {data?.text}</h1>
                <div>
                    {data?.answers?.map((a, i)=><div key={i}><CheckBoxText active={isSelectedAnswer(a)} text={a.text} onClick={()=>selectAnswer(a)} /></div>)}
                </div>
                <div className='flex justify-end'>
                    <div className='p-2'><DefaultButton onClick={previousClickHandler} disabled={questionId <= 1}>Previous</DefaultButton></div>
                    <div className='p-2'><DefaultButton onClick={nextClickHandler} disabled={questionId >= 5}>Next</DefaultButton></div>
                    {questionId >= 5 ? <div className='p-2'><DefaultButton onClick={finishClickHandler}>Finish</DefaultButton></div> : null}
                </div>
            </> : ''}
        </>
    </ContentWrap>;
}