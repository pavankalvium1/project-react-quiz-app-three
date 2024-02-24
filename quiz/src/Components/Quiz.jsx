import React, { useState } from "react";
import quizQuestion from "../questions.json";
import { Link, useNavigate } from "react-router-dom";

const Quiz = () => {
  const [state, setState] = useState({
    currentIndex: 0,
    question: quizQuestion[0].question,
    optionA: quizQuestion[0].optionA,
    optionB: quizQuestion[0].optionB,
    optionC: quizQuestion[0].optionC,
    optionD: quizQuestion[0].optionD,
    score: 0,
    questionsAnswered: 0,
    questionsWrong: 0,
  });

  const navigate = useNavigate();

  const renderNext = () => {
    if (state.currentIndex < quizQuestion.length - 1) {
      setState((prevState) => ({
        ...prevState,
        currentIndex: prevState.currentIndex + 1,
        questionsAnswered: prevState.questionsAnswered + 1,
        question: quizQuestion[prevState.currentIndex + 1].question,
        optionA: quizQuestion[prevState.currentIndex + 1].optionA,
        optionB: quizQuestion[prevState.currentIndex + 1].optionB,
        optionC: quizQuestion[prevState.currentIndex + 1].optionC,
        optionD: quizQuestion[prevState.currentIndex + 1].optionD,
      }));
    } else {
      renderResult();
      navigate("/result");
    }
  };

  const renderPrev = () => {
    if (state.currentIndex > 0) {
      setState((prevState) => ({
        ...prevState,
        currentIndex: prevState.currentIndex - 1,
        question: quizQuestion[prevState.currentIndex - 1].question,
        optionA: quizQuestion[prevState.currentIndex - 1].optionA,
        optionB: quizQuestion[prevState.currentIndex - 1].optionB,
        optionC: quizQuestion[prevState.currentIndex - 1].optionC,
        optionD: quizQuestion[prevState.currentIndex - 1].optionD,
      }));
    }
  };

  const renderQuit = () => {
    if (window.confirm("Are you sure you want to quit?")) {
      setState({
        currentIndex: 0,
        question: quizQuestion[0].question,
        optionA: quizQuestion[0].optionA,
        optionB: quizQuestion[0].optionB,
        optionC: quizQuestion[0].optionC,
        optionD: quizQuestion[0].optionD,
        score: 0,
        questionsAnswered: 0,
        questionsWrong: 0,
      });
    }
  };

  const renderCheck = (selectedOption) => {
    const correctAnswer = quizQuestion[state.currentIndex].answer;

    if (selectedOption === correctAnswer) {
      alert("Option Clicked Is Correct");
      setState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }));
    } else {
      alert("Option Clicked Is Wrong");
      setState((prevState) => ({
        ...prevState,
        questionsWrong: prevState.questionsWrong + 1,
      }));
    }

    renderNext();
  };

  const renderResult = () => {
    const questionsAttempted = state.questionsAnswered;
    const questionsWrong = state.questionsWrong;
    localStorage.clear();
    localStorage.setItem("score", state.score);
    localStorage.setItem("questionsAttempted", questionsAttempted);
    localStorage.setItem("questionsWrong", questionsWrong);
  };

  return (
    <div className="quiz-game">
      <h1>Question</h1>
      <p>
        {state.currentIndex + 1} of {quizQuestion.length}
      </p>
      <p className="question">{state.question}</p>

      <div className="options">
        <div className="quiz-option" onClick={() => renderCheck(state.optionA)}>
          {state.optionA}
        </div>
        <div className="quiz-option" onClick={() => renderCheck(state.optionB)}>
          {state.optionB}
        </div>
        <div className="quiz-option" onClick={() => renderCheck(state.optionC)}>
          {state.optionC}
        </div>
        <div className="quiz-option" onClick={() => renderCheck(state.optionD)}>
          {state.optionD}
        </div>
      </div>

      <div className="quiz-buttons">
        <button className="quiz-prev" onClick={renderPrev}>
          Previous
        </button>
        <button className="quiz-next" onClick={renderNext}>
          Next
        </button>
        <button className="quiz-quit" onClick={renderQuit}>
          Quit
        </button>
        <Link to="/result">
          <button className="quiz-finish" onClick={renderResult}>
            Finish
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Quiz;
