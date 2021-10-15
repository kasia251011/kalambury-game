import React from "react";

export default class Clue extends React.Component {

  componentDidMount(){
    const randomIndex = Math.floor(Math.random() * this.state.categories.clues.length);
  }

  randomClue = () => {
    
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}