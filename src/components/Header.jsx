import quizLogoImage from '../assets/quiz-logo.png'

function Header(){
	return (
		<header>
			<img src={quizLogoImage} alt="quiz logo"></img>
			<h1>ReactQuiz</h1>
		</header>
	)
}

export default Header;