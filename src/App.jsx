import React from "react";
import { useState } from "react";
import Hero from "./Components/Hero";
import Questions from "./Components/Questions";

function App() {
  const [showQuestions, setShowQuestions] = useState(false);

  return (
    <div className="container">
      {showQuestions ? (
        <Questions />
      ) : (
        <Hero showQuestions={setShowQuestions} />
      )}
    </div>
  );
}

export default App;
