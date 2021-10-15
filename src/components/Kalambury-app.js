import React from "react";
import Start from "./Start/Start";
import Game from "./Game/Game";
import Results from "./Results/Results";
import { STATUS_GAME, RUND } from "./globals";

export default class KalamburyApp extends React.Component {
  state = {
    statusGame: STATUS_GAME.START,
    rund: RUND.FIRST_PLAYER,
    name1: "Team 1",
    name2: "Team 2",
    score1: 0,
    score2: 0,
    time: "01:00",
    selectedCategory: "Zwierzęta",
    categories: [
      {
        name: "Zwierzęta",
        clues: [
          "Paw", 
          "Pies", 
          "Kot", 
          "Tygrys", 
          "Niedźwiedź"
        ]
      },
      {
        name: "Filmy i postacie",
        clues: [
          "Skazani na Shawschank", 
          "Kubuś puchatek", 
          "Hobbit",
          "Pinokio"
        ]
      },
      {
        name: "Czynności",
        clues: [
          "Podlewanie kwiatów", 
          "Tańczenie", 
          "Third",
          "Sprzątanie", 
          "Jazda samochodem"
        ]
      }
    ]
  }

  myRouter = () =>{
    switch(this.state.statusGame){
      case STATUS_GAME.START:
        this.setState(() => ({statusGame: STATUS_GAME.GAME}));
        break;
      case STATUS_GAME.GAME:
        this.setState(() => ({statusGame: STATUS_GAME.RESULT}));
        break;
      default:
        this.setState(() => ({statusGame: STATUS_GAME.START}));
        break;
    }
  } 

  saveChanges = (e) => {
    const inputs = e.target.elements;

    this.setState(() => ({
      name1: inputs["name1"].value,
      name2: inputs["name2"].value,
      selectedCategory: inputs["category"].value,
      time: inputs["time"].value
    }));

  }

  addPoint = () => {
    if(this.state.rund == RUND.FIRST_PLAYER){
      this.setState((prevState) => ({score1: prevState.score1 + 1}));
    }else{
      this.setState((prevState) => ({score2: prevState.score2 + 1}));
    }
  }

  nextRund = () => {
    this.setState((prevState) => ({rund: prevState.rund + 1}));
    if(this.state.rund > RUND.SECOND_PLAYER){
      this.myRouter();
    }
  }



  render() {

    return (
      <div>
      
        {this.state.statusGame == STATUS_GAME.START ? 
          <Start 
            myRouter={this.myRouter} 
            variables = {this.state} 
            saveChanges={this.saveChanges}
          /> : (this.state.statusGame == STATUS_GAME.GAME ? 
          <Game 
            myRouter={this.myRouter} 
            variables = {this.state}
            addPoint={this.addPoint}
            nextRund={this.nextRund}
          /> : 
          <Results 
            myRouter={this.myRouter} 
            variables = {this.state}
          />
        )}
      </div>
    )
  }
}