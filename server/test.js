//const blink = require("./blink")
const Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
//const LED = new Gpio(22, 'out'); //use GPIO pin 4, and specify that it is output
const LCD = require('raspberrypi-liquid-crystal');
const lcd = new LCD( 1, 0x27, 16, 2 );

//////////////////////////////////////////////////////////////////////////////////////
// Leaving the below in in case I want to do more testing. The RGB-LED technically
// works, but is of bad quality. The color changing is not very visible.
// Have deinstalled pigpio for now.
//////////////////////////////////////////////////////////////////////////////////////
// const Gpio = require('pigpio').Gpio, //include pigpio to interact with the GPIO
// ledRed = new Gpio(17, {mode: Gpio.OUTPUT}), //use GPIO pin 4 as output for RED
// ledGreen = new Gpio(27, {mode: Gpio.OUTPUT}), //use GPIO pin 17 as output for GREEN
// ledBlue = new Gpio(18, {mode: Gpio.OUTPUT}), //use GPIO pin 27 as output for BLUE
// redRGB = 1, //set starting value of RED variable to off (0 for common cathode)
// greenRGB = 255, //set starting value of GREEN variable to off (0 for common cathode)
// blueRGB = 255; //set starting value of BLUE variable to off (0 for common cathode)

// // ledRed.digitalWrite(0); // Turn RED LED off
// // ledGreen.digitalWrite(0); // Turn GREEN LED off
// // ledBlue.digitalWrite(0);

// ledRed.pwmWrite(redRGB); //set RED LED to specified value
// ledGreen.pwmWrite(greenRGB); //set GREEN LED to specified value
// ledBlue.pwmWrite(blueRGB);
///////////////////////////////////////////////////////////////////////////////////////////


// Setting the LED to Off
//LED.writeSync(0)


// Testing the LCD screen
// lcd.beginSync();
// lcd.clearSync();
// lcd.printSync( 'I am a fucking');
// lcd.setCursorSync(0, 1);
// lcd.printSync( 'magician. Yo');

// Clearing the LCD screen
//lcd.clearSync();

const { StillCamera } = require('pi-camera-connect');
const fs = require("fs");

// Take still image and save to disk
/*
const runApp = async () => {

    const stillCamera = new StillCamera();

    const image = await stillCamera.takeImage();

    fs.writeFileSync("still-image.jpg", image);
};

runApp();
*/
async function testvid() {
// fetch the AVI file
const sourceBuffer = await fetch("./video-stream.h264").then(r => r.arrayBuffer());

// create the FFmpeg instance and load it
const ffmpeg = createFFmpeg({ log: true });
await ffmpeg.load();

// write the AVI to the FFmpeg file system
ffmpeg.FS(
  "writeFile",
  "input.avi",
  new Uint8Array(sourceBuffer, 0, sourceBuffer.byteLength)
);

// run the FFmpeg command-line tool, converting the AVI into an MP4
await ffmpeg.run("-i", "input.avi", "output.mp4");

// read the MP4 file back from the FFmpeg file system
const output = ffmpeg.FS("readFile", "output.mp4");

// ... and now do something with the file
const video = document.getElementById("video");
video.src = URL.createObjectURL(
  new Blob([output.buffer], { type: "video/mp4" })
);
}

testvid();