import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';

import Question from './Question.jsx';
import Summary from './Summary.jsx';

function Quiz(){
	const [userAnswers, setUserAnswers] = useState([]);
	
	// ensure activeQuestion index remaing on current answer
	// while styling changes applied (and doesn't immediately)
	// jump ahead to next question
	const activeQuestionIndex = userAnswers.length;

	const quizIsComplete = (activeQuestionIndex === QUESTIONS.length)

	const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
		setUserAnswers((previousUserAnswers) => {
			return [...previousUserAnswers, selectedAnswer]
		})
	}, 
	// state updating functions are NOT added to dependencies
	// react guarantees state updating fx do not change
	[]);

	const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

	if (quizIsComplete){
		return <Summary userAnswers={userAnswers} />
		
	}

	return (
		<div id="quiz">
			<Question
				key={activeQuestionIndex}
				questionIndex={activeQuestionIndex} 
				onSelectAnswer={handleSelectAnswer}
				onSkipAnswer={handleSkipAnswer}
			/>
		</div>
	)
}

export default Quiz;