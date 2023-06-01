import React from 'react';
import FormQuiz from './Form_Quiz';
import { questions } from './data/questions';

const Quiz = () => {
    return (
        <div>
            <FormQuiz questions={questions}/> 
        </div>
    );
}

export default Quiz;