import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultButton } from '../common/Button/Default';
import ContentWrap from '../common/ContentWrap';

export default function Welcome () {

    const navigate = useNavigate();

    const startTestHandler = () => {

        navigate('/question/1');
    }

    return <ContentWrap>
        <div>
            <h1 className="text-5xl font-bold">Are you introvert or extrovert?</h1>
            <p className="py-6">Complete 5 question test and learn if you are introverted or extroverted person!</p>
            <DefaultButton onClick={startTestHandler}>Start Test</DefaultButton>
        </div>
    </ContentWrap>;
}