//import React, { useState } from "react";
import "./styles/navbar.css";

export default function Navbar(
    // {states here, if needed}
  ) {
    
    // functions here
    
    return (
      <>
        <div className="navbar">
          <h1 className="title" >
              RaspIOT!
          </h1>
          <img className="raspilogo" src="./assets/RPi-Logo-SCREEN.png" alt="The Raspi Logo" height="105.33 px" width="92 px" align></img>
          
          
        </div>
      </>
    );
  }
  
  // the onClick always needs to run the function inside an arrow function
  // details here: https://stackoverflow.com/questions/57392633/why-do-i-need-to-pass-an-anonymous-function-into-the-onclick-event
  