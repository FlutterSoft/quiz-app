import React, { useState } from 'react';

export default function App() {
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [quizComplete, setQuizComplete] = useState(false)
	const [score, setScore] = useState(0)
	const [pastScores, setPastScores] = useState([])
	function handleAnswerClick(option){
		const nextQuestion = currentQuestion + 1

		if(option.isCorrect){
			setScore(prev => prev+1)
		}

		if(nextQuestion < questions.length){
			setCurrentQuestion(nextQuestion)
		}
		else{
			setQuizComplete(true)
		}
	}
	function handleResetClick(){
		setCurrentQuestion(0)
		setScore(0)
		if(quizComplete){
			const scoreList = [...pastScores, score]
			setPastScores(scoreList)
		}
		setQuizComplete(false)
	}

	function ResetButton(){
		return(
			<button className='resetQuizBtn' onClick={handleResetClick}>Reset Quiz</button>
		)
	}
	return (
		<div className='app'>
			{quizComplete ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
					<ResetButton />
				</div>
				
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion +1}</span>/{questions.length}
						</div>
						<div className='question-text'>
							{questions[currentQuestion].questionText}
						</div>
						<ResetButton />
						<div>
							<h3>Past Scores</h3>
							<ul>
								{pastScores.length > 0 && pastScores.map(score=> <li>{score}</li>)}
							</ul>
						</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map(option => <button onClick={() => handleAnswerClick(option)}>{option.answerText}</button>)}
					</div>
				</>
				)
			}
		</div>
	);
}
