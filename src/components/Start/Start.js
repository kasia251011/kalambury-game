import React from "react";
import Menu from "./Menu";


const Start = (props) => (
  <div>
    <div className="container">
      <h1 className="title">Kalambury</h1>
    </div>
    <div className="container">
      <Menu 
        variables={props.variables} 
        myRouter={props.myRouter} 
        saveChanges={props.saveChanges}
      />
    </div>
    
  </div>
);

export default Start;