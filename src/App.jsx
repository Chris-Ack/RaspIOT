import './styles/App.css';
import React, { useState } from "react";
import Lights from "./Lights";
import Navbar from "./Navbar";
import LCD from "./LCD";
import Camera from "./Camera";

export default function App() {

  const [firstLightOn, setFirstLight] = useState(false);
  const [firstLightButton, setFirstLightButton] = useState("Light on")
  const [lineOne, setLineOne] = useState("")
  const [lineTwo, setLineTwo] = useState("")
  const [picPath, setPicPath] = useState("")
  const [streamPath, setStreamPath] = useState(".CVG")
  const [mockTest, setMockTest] = useState("notRun")

  return (
    <div className="App">
      <Navbar/>
      
        <div className="container">
          <div className="item-cam">
          <Camera 
          picPath={picPath}
          setPicPath={setPicPath}
          streamPath={streamPath}
          setStreamPath={setStreamPath}
          mockTest={mockTest}
          setMockTest={setMockTest}
          />
          </div>
          <div className="item-light">
          <Lights
          firstLightOn={firstLightOn}
          setFirstLight={setFirstLight}
          firstLightButton={firstLightButton}
          setFirstLightButton={setFirstLightButton}
          />
          </div>
          <div className="item-display">
          <LCD
          lineOne={lineOne}
          setLineOne={setLineOne}
          lineTwo={lineTwo}
          setLineTwo={setLineTwo}
          />
          </div>
      </div>
    </div>
  );
}

