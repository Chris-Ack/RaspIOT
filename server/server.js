
//Library dependencies
const express = require("express");
const cors = require("cors");
const LCD = require('raspberrypi-liquid-crystal');

// GPIO setup
const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
const LED = new Gpio(22, 'out'); //use GPIO pin 4, and specify that it is output
const lcd = new LCD( 1, 0x27, 16, 2 );

// Camera setup
const { StillCamera } = require('pi-camera-connect');
const { StreamCamera, Codec } = require('pi-camera-connect')
const fs = require("fs");
const streamCamera = new StreamCamera({
  codec: Codec.H264
});


// Server
const server = () => {
  lcd.beginSync();
  const app = express();

  app.use(express.json());
  app.use(cors({ credentials: true, origin: true }));

  
  // Initial Endpoint to test connection
  app.get("/api/notes/", async (_, res) => {
    console.log("Hello, Server");
    res.send("buabuabua").status(200)
  })
  
  // Endpoint to turn LED on/off
  app.get("/api/test/:on", async (req, res) => {
    let onoroff = req.params.on
    
    if (onoroff === "on") {
      console.log("on: ", onoroff);
      LED.writeSync(1)
      res.send("on").status(200)
    }
    else {
      console.log("off: ", onoroff);
      LED.writeSync(0);
      res.send("off").status(201)
    }

  });

  // Endpoint to clear the LCD
  app.get("/api/lcd/clear", async (req, res) => {
    
    lcd.clearSync();
    res.send("LCD cleared").status(200)

  })

  // Endpoint for writing text on LCD
  app.post("/api/lcd/update", async (req, res) => {
            
    lineOne = req.body.inputOne
    lineTwo = req.body.inputTwo
  
    console.log(lineOne)
    console.log(lineTwo)
    
    //lcd.beginSync();
    lcd.clearSync();
    lcd.printLineSync(0, lineOne);
    lcd.printLineSync(1, lineTwo);
      
    return res.sendStatus(201)
  });

  //Endpoint for Picture from Camera, stream version

  /*
  app.get("/api/camera/pic", async (req, res) => {
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG
    });

    await streamCamera.startCapture();
    const image = await streamCamera.takeImage();
    await streamCamera.stopCapture();
    console.log("Image requested ", image)
    res.send(image).status(200)
  })
  */

    //Endpoint for Picture from Camera, still version

  app.get("/api/camera/pic", async (req, res) => {
    const stillCamera = new StillCamera();
    
    const image = await stillCamera.takeImage();

    console.log("Image requested ", image)
    res.send(image).status(200)
  });

  app.get("/api/camera/startstream", async (req, res) => {
        
  const videoStream = streamCamera.createStream();
  
  const writeStream = fs.createWriteStream("video-stream.h264");

  // Pipe the video stream to our video file
  videoStream.pipe(writeStream);

  await streamCamera.startCapture();
  
  videoStream.on("data", data => console.log("New video data", data));
  videoStream.on("end", data => console.log("Video stream has ended"));
  //videoStream.on("data", data => res.send(data))
  
  
  // Wait 5 seconds
  
  const src = fs.createReadStream("./video-stream.h264")
  src.pipe(res)
  await new Promise(resolve => setTimeout(() => resolve(), 5000));
  await streamCamera.stopCapture();
  //res.Status(200)
  });

  app.get("/api/camera/stopstream", async (req, res) => {
    streamCamera.stopCapture();
    console.log("Stream stopped, I hope.")
    res.send("Stream Stopped").status(200)    
  })

  app.get("/api/camera/test", async(req,res) => {
    const src = fs.createReadStream("./CVG.mp4")
    src.pipe(res)
  })

return app
}


module.exports = { server }



