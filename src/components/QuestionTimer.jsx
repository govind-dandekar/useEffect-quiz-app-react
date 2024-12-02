import { useEffect, useState } from 'react';

function QuestionTimer({ timeout, onTimeout, mode }){
	
	const [timeRemaining, setTimeRemaining] = useState(timeout);

	useEffect(() => {
		console.log('SETTING TIMEOUT')
		const timer = setTimeout(onTimeout, timeout);
		
		return(() => {
			clearTimeout(timer)
		})
	}, 
	// ensure fx re-executed if timeout or onTimeout changes
	// uE fx runs if surrounding component executes again (QuestionTimer)
	// and a dependency changes
	[timeout, onTimeout])
	
	useEffect(() => {
		console.log('SETTING INTERVAL')
		const interval = setInterval(() => {
			setTimeRemaining((previousTime) => previousTime - 100)
		}, 100)

		return(() => {
			clearInterval(interval)
		})
	}, [])
	
	return (
		<progress 
			id="question-time" 
			value={timeRemaining}
			max={timeout}
			className={mode}
		/>
	)
}

export default QuestionTimer;