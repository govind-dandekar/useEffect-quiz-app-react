import { useState } from 'react';

import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers";
import QUESTIONS from '../questions.js';

function Question({
	questionIndex,
	onSelectAnswer,
	onSkipAnswer
}){
	const [answer, setAnswer] = useState({
		selectedAnswer: '',
		isCorrect: null
	});

	function handleSelectAnswer(answer){
		setAnswer({
			selectedAnswer: answer,
			isCorrect: null
		}) 
			
		setTimeout(() => {
			setAnswer({
				selectedAnswer: answer,
				isCorrect: (QUESTIONS[questionIndex].answers[0] === answer)
			})

			setTimeout(() => {
				onSelectAnswer(answer);
			}, 2000)
		}, 1000)
	}

	let answerState = ''

	if (answer.selectedAnswer && answer.isCorrect !== null){
		answerState = answer.isCorrect ? 'correct' : 'wrong'
	} else if (answer.selectedAnswer) {
		answerState = 'answered'
	}

	return (
		<div id="quiz">
			<div id="question">
				{/* QuestionTimer component doesn't get re-created on Quiz 
				    re-render because it hasn't changed; timers and intervals
						in QuestionTimer are not reset; use key prop -- whenever
						key changes, react will unmount old and remount new component;
						key can be set on any element or component */}
				<QuestionTimer
					timeout={10000}
					onTimeout={onSkipAnswer}
				/>
				<h2>{QUESTIONS[questionIndex].text}</h2>
				{/* not allowed to use same key on different components */}
				<Answers
					answers={QUESTIONS[questionIndex].answers}
					selectedAnswer={answer.selectedAnswer}
					answerState={answerState}
					onSelect={handleSelectAnswer}
				/>
			</div>
		</div>
	)
}

export default Question;