import React, { useEffect, useState } from 'react';
import ContentWrap from '../common/ContentWrap';
import { useQuery } from 'react-query';
import { verifyAnswers } from '../../utils/answers';
import { DefaultButton } from '../common/Button/Default';
import { LOCAL_STORAGE_KEY } from '../../config';
import { useNavigate } from 'react-router-dom';
import Error from '../common/Error';
import { getPersonalityType } from '../../services/persTestService';
import { PersTypeResult } from '../../types/persType';

export default function Results () {

    const navigate = useNavigate();

    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

    const { isLoading, error, data, refetch } = useQuery<PersTypeResult, Error>({
        queryKey: [`question`, selectedAnswers],
        queryFn: () => getPersonalityType(selectedAnswers),
        enabled: false
    });

    useEffect(() => {

        const answers = localStorage.getItem(LOCAL_STORAGE_KEY);
    
        if(typeof answers !== 'string') {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            navigate('/questions/1');
            return;
        }
        
        const answersArray = JSON.parse(answers);
        setSelectedAnswers(answersArray);
        
        
    }, [navigate]);

    useEffect(()=>{

        if(verifyAnswers() && selectedAnswers.length > 0) {
            refetch();
        }

    }, [selectedAnswers, refetch])


    const startNewHandler = () => {

        localStorage.removeItem(LOCAL_STORAGE_KEY);
        navigate('/question/1');
    }

    return <ContentWrap>
        <>
            <h1 className='text-2xl font-bold'>
                <span className='text-slate-400'>Your personality type is {data?.type}!</span>
            </h1>
            {isLoading ? 'loading...' : ''}
            <Error text={error ? 'An error occured fetching data' : null} />
            <div className='flex justify-end py-5'>
                <DefaultButton onClick={startNewHandler}>Start New</DefaultButton>
            </div>
        </>
    </ContentWrap>
}