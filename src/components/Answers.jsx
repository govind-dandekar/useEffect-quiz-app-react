import { useRef } from 'react';

function Answers({answers, selectedAnswer, answerState, onSelect}){
	// useRef to manage value stored independently of component lifecycle
	const shuffledAnswers = useRef();

	// if undefined run shuffle logic once
	if (!shuffledAnswers.current){
		// runs whenever Quiz component executes so answers shuffle
		// only want answers to shuffle once
		shuffledAnswers.current = [...answers];
		// will edit existing array since array is a reference
		// will return 50-50 positive - negative; Math.random(generates)
		// value between 0 and 1
		shuffledAnswers.current.sort(() => (Math.random() - 0.5));
	}

	return(
	<ul id="answers">
		{shuffledAnswers.current.map((answer) => {
				const isSelected = (selectedAnswer === answer)
				
				let cssClass = '';

				if (answerState === 'answered' && isSelected ){
					cssClass = 'selected'
				} 

				if ((answerState === 'correct' || answerState === 'wrong') &&
							isSelected
				){
					cssClass = answerState;
				}

				return (
					<li 
						key={answer}
						className="answer"
					>
						<button 
							onClick={() => onSelect(answer)}
							className={cssClass}
							disabled={answerState !== ''}
						>
							{answer}
						</button>
					</li>
				)
			}
		)}
	</ul>)
}

export default Answers;

