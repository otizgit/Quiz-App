import React from "react";
import { useState, useEffect } from "react";
import SingleQuestion from "./SingleQuestion";
import { nanoid } from "nanoid";

export default function QuestionBox(props) {
  const [questions, setQuestions] = useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0);
  const [showResults, setShowResults] = useState(false);

  React.useEffect(() => {
    if (questions.length === 0) {
      fetch("https://opentdb.com/api.php?amount=20&category=9&type=multiple")
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.results);
          setQuestionsAndAnswers(
            data.results.map((questionObject, index) => {
              return {
                id: index + 1,
                question: questionObject.question,
                shuffledAnswers: shuffle([
                  ...questionObject.incorrect_answers,
                  questionObject.correct_answer,
                ]),
                correctAnswer: questionObject.correct_answer,
                selectedAnswer: "",
              };
            })
          );
        })
        .catch(() => {
          alert(
            "Oops! An error occured, please check your internet connection and try again."
          );
        });
    }
  }, [questions]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function updateAnswer(currentQuestion, answer) {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((questionObject) => {
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
      })
    );
  }

  function checkAnswers() {
    const notAllAnswered = questionsAndAnswers.some(
      (questionObject) => questionObject.selectedAnswer === ""
    );

    setShowWarning(notAllAnswered);

    if (!notAllAnswered) {
      setShowResults(true);
      questionsAndAnswers.forEach((questionObject) => {
        if (questionObject.selectedAnswer === questionObject.correctAnswer) {
          setNumCorrectAnswers(
            (prevNumCorrectAnswer) => prevNumCorrectAnswer + 1
          );
        }
      });
    }
  }

  function playAgain() {
    setQuestions([]);
    setQuestionsAndAnswers([]);
    setShowResults(false);
    setNumCorrectAnswers(0);
  }

  const allQuestions = questionsAndAnswers.map((questionsObj) => (
    <SingleQuestion
      key={nanoid()}
      id={questionsObj.id}
      question={questionsObj.question}
      allAnswers={questionsObj.shuffledAnswers}
      updateAnswer={updateAnswer}
      selectedAnswer={questionsObj.selectedAnswer}
      correctAnswer={questionsObj.correctAnswer}
      showResult={showResults}
    />
  ));

  let percentageClass;
  let percentageScore = numCorrectAnswers / questionsAndAnswers.length * 100 
  if (percentageScore >= 70) {
    percentageClass = "excellent";
  } else if (percentageScore < 70 && percentageScore >= 45) {
    percentageClass = "good";
  } else {
    percentageClass = "bad";
  }

  return (
    <div className="hero question-container">
      {allQuestions}
      <div className="check-container">
        {showWarning && (
          <p className="display-error">Please Answer All Questions</p>
        )}
        {questions.length && !showResults ? (
          <button className="custom-btn check-btn" onClick={checkAnswers}>
            Check answers
          </button>
        ) : null}
      </div>

      {showResults && (
        <div className="result-container">
          <p className="result-message">
            Your score: {numCorrectAnswers}/{questionsAndAnswers.length}{" "}
            <span className={percentageClass}>
              ({percentageScore}%)
            </span>
          </p>
          <button className="play-btn custom-btn" onClick={playAgain}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
