import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultButton } from '../common/Button/Default';

export default function Welcome () {

    const navigate = useNavigate();

    const startTestHandler = () => {

        navigate('/question/1');
    }

    return <div>
        <header className="flex flex-col justify-center items-center h-screen">
            <h1 className="text-6xl">Are you introvert or extrovert?</h1>
            <div className='p-6'>
                <DefaultButton onClick={startTestHandler}>Start Test</DefaultButton>
            </div>
        </header>
    </div>;
}