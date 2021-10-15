import React from "react";
import { RUND } from "../globals";

export default class Game extends React.Component {

  stoperInterval;
  countOfNO = 0;

  state = {
    clue: "Hasło",
    seconds: parseInt(this.props.variables.time.slice(3)),
    minutes: parseInt(this.props.variables.time.slice(0,2)),
    colorTime: {color:'rgb(77, 77, 77)'}
  }

  componentDidMount(){
    this.newRund();
  }

  resetStopper = () => {
    this.setState(() => ({
      seconds: parseInt(this.props.variables.time.slice(3)),
      minutes: parseInt(this.props.variables.time.slice(0,2)),
      colorTime: {color:'rgb(77, 77, 77)'}
    }));
  }

  newRund = () => {
    if(this.props.variables.rund <= RUND.SECOND_PLAYER){
      this.countOfNO = 0;
      this.resetStopper()
      this.randomClue();
      this.stoperInterval = setInterval(this.stopper, 1000);
    }
  }

  randomClue(){

    let clues;
    this.props.variables.categories.forEach(category => {
      if(category.name == this.props.variables.selectedCategory){
        clues = category.clues;
      }
    });
    const randomIndex = Math.floor(Math.random() * clues.length);
    
    this.setState(() => ({clue: clues[randomIndex]}));
  }

  correct = () => {
    this.props.addPoint();
    this.randomClue();
  } 

  uncorrect = () => {
    this.countOfNO++;
    this.randomClue();
  }
  
  stopper = () => {
    const seconds = this.state.seconds;
    const minutes = this.state.minutes;

    if(minutes == 0 && seconds == 0){
      clearInterval(this.stoperInterval);
      this.props.nextRund();
      this.newRund();
    }else{
      if(seconds == 0){
        this.setState((prevState) => ({
          minutes: prevState.minutes - 1,
          seconds: 59
        }));
      }else{
        this.setState((prevState) => ({
          seconds: prevState.seconds - 1
        }));
      }
    }

    if(minutes < 1 && seconds <=11){
      this.setState(() => ({colorTime: {color: 'rgb(223, 85, 85)'}}));
    }else{
      this.setState(() => ({colorTime: {color: 'rgb(77, 77, 77)'}}));
    }
  }
  
  render() {
    
    const { variables } = this.props;
    return (
      <div className="container game-container">
        <button 
          onClick={this.uncorrect}
          disabled={this.countOfNO >= 3? true : false}
          className="no-button"
        >NO
        </button>
        <div className="game-box">
          <div><div className="team-name">
            {variables.rund == 1 ? variables.name1 : variables.name2}
          </div>
          <div className="category">
            {variables.selectedCategory}
          </div></div>
          <div className="clue">
            {this.state.clue}
          </div>
          <div className="time" style={this.state.colorTime}>
            {this.state.minutes < 10 && '0'}
            {this.state.minutes} : {this.state.seconds < 10 && '0'}
            {this.state.seconds}
          </div>
        </div>
        <button 
          onClick={this.correct}
          className="yes-button"
        > 
          YES
        </button>
      </div>
    )
  }
}