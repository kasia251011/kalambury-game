import React from "react";

const Results = (props) => (
  <div>
    <h2>WYNIKI</h2>
    <div className="results">
      <div className="result">
        <div className="team-name">{props.variables.name1}</div>
        <div className="score">{props.variables.score1}</div>
      </div>
      <div className="result">
        <div className="team-name">{props.variables.name2}</div>
        <div className="score">{props.variables.score2}</div>
      </div>
    </div>
    <button onClick={props.myRouter}>RESTART</button>
  </div>
);

export default Results;