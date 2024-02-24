import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h3>Quiz App</h3>
      <Link to="/game">
        <button className="play">Play</button>
      </Link>
    </div>
  );
};

export default Home;
