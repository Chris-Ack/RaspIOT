//import React, { useState } from "react";


export default function Lights({
    firstLightOn,
    setFirstLight,
    firstLightButton,
    setFirstLightButton
  }) {
    
    async function lightOn() {        
        if (firstLightOn === false) {
        console.log("setFirstLight was set to: ", firstLightOn);
        setFirstLight(true);
        setFirstLightButton("Light Off");
        await fetch(`${process.env.REACT_APP_URL}/api/test/on`)
        
        }
        else if (firstLightOn === true) {
            console.log("setFirstLight was set to: ", firstLightOn);
        setFirstLight(false);
        setFirstLightButton("Light On")
        await fetch(`${process.env.REACT_APP_URL}/api/test/off`)
        
        }
        else {console.log("Nope. ", firstLightOn)}
      }
    
    return (
      <>
        <div>
          <h1>LED controls</h1>
          <button className="button" onClick={() => lightOn()}>{firstLightButton}</button>
        </div>
      </>
    );
  }
  
  // the onClick always needs to run the function inside an arrow function
  // details here: https://stackoverflow.com/questions/57392633/why-do-i-need-to-pass-an-anonymous-function-into-the-onclick-event
  