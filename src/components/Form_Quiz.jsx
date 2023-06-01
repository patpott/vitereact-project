import React, { useState } from 'react';

const FormQuiz = ({ questions }) => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswerClick = (answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion]: answer,
    }));

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setCurrentQuestion(-1);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
  };

  if (currentQuestion === -1) {
    return (
      <div>
        <h2>Toutes les questions ont été répondues.</h2>
        <h3>Réponses :</h3>
        {questions.map((question, index) => (
          <div key={index}>
            <p>
              <strong>Question {index + 1}: {question.question}</strong>
            </p>
            <p>
              Réponse choisie : {answers[index]}
              {answers[index] === question.answer ? (
                <span role="img" aria-label="correct">
                  ✔️
                </span>
              ) : (
                <span role="img" aria-label="incorrect">
                  ❌
                </span>
              )}
            </p>
            <p>Réponse correcte : {question.answer}</p>
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleRestart}
        >
          Recommencer
        </button>
      </div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md w-full">
        <div className="font-medium mb-2">
          <strong>{currentQuestionData.question}</strong>
        </div>
        {currentQuestionData.options.map((option, optionIndex) => (
          <button
            key={optionIndex}
            onClick={() => handleAnswerClick(option)}
            className={`${
              answers[currentQuestion] === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } py-2 px-4 rounded mb-2`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormQuiz;
