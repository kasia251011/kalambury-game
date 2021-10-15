import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

export default class Menu extends React.Component {
  saveChanges = (e) => {
    e.preventDefault();
    this.props.saveChanges(e);
    setTimeout(() => {
      if(this.props.variables.name1 != this.props.variables.name2){
        console.log(this.props.variables.name1, this.props.variables.name2);
        this.props.myRouter();
      }
    })
  }

  clearPlaceholder = (e) => {
    e.target.placeholder="";
  }

  setPlaceholder = (e) => {
    e.target.placeholder = "Drużyna 1";
  }

  render() {
    return (
      <form onSubmit={this.saveChanges} className=" form">
        {this.props.variables.name1 == this.props.variables.name2 && <p>Nazwy drużyn muszą być różne</p>}
        <div className="team-name-inputs">
          <input 
            className="team-name-input" 
            type="text" 
            name="name1" 
            placeholder="Drużyna 1" 
            required
            autoComplete="off"
            onFocus={this.clearPlaceholder}
            onBlur={this.setPlaceholder}
          />
          <input 
            className="team-name-input" 
            type="text" name="name2" 
            placeholder="Drużyna 2" 
            required
            autoComplete="off"
            onFocus={this.clearPlaceholder}
            onBlur={this.setPlaceholder}
          />
        </div>
        <div className="menu-box">
          <div className="menu-column">
            <select name="time" className="time-select">
              <option value="01:00">01:00</option>
              <option value="01:00">01:30</option>
              <option value="01:00">02:00</option>
              <option value="01:00">02:30</option>
              <option value="01:00">03:00</option>
            </select>
            <select name="category" className="category-select">
              {this.props.variables.categories.map((cat) => (
                <option 
                  value={cat.name}
                  key={cat.name}
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="menu-column">
          <button className="start-button">
            <FontAwesomeIcon icon={faPlay} className="i-play"/>
          </button>
          </div>
        </div>
      </form>
    )
  }
}