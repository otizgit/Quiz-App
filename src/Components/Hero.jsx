import React from "react";

export default function Hero(props) {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="logo-container">
          <img src="./logo.png" alt="logo.png" />
          <h1 className="logo-title">Quizzz</h1>
        </div>
        <p className="description">Put your smartness to the test</p>
        <div className="btn-box">
          <button className="custom-btn" onClick={() => props.showQuestions(true)}>Start Quiz</button>
        </div>
      </div>
    </div>
  );
}
