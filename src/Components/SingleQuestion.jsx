import React from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function SingleQuestion(props) {
  function clickAnswer(answer, currentQuestion) {
    props.updateAnswer(currentQuestion, answer);
  }

  const answersElements = props.allAnswers.map((answer) => {
    return (
      <button
        onClick={() => clickAnswer(answer, props.question)}
        key={nanoid()}
        className={`custom-btn answer-btn ${
          answer === props.selectedAnswer ? "selected" : ""
        }
        ${props.showResult && answer === props.correctAnswer ? "correct" : ""}
        ${
          props.showResult &&
          answer === props.selectedAnswer &&
          answer !== props.correctAnswer
            ? "incorrect"
            : ""
        }
        ${props.showResult && answer !== props.correctAnswer ? "dimmed" : ""}
        `}
        disabled={props.showResult}
      >
        {decode(answer)}
      </button>
    );
  });

  return (
    <div className="question-content">
      <h1 className="question-header">{props.id}</h1>
      <p className="question">{decode(props.question)}</p>
      <div className="answer-btn-container">{answersElements}</div>
    </div>
  );
}
