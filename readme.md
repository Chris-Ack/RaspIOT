"This was created during my time as a student at Code Chrysalis."

This is the Repo for the project I will talk about in my Tech Talk on May 22, 2021

“RaspIOT” - Personalizing the IOT with a RaspberryPi

The foundations for this is an earlier project of mine called "Johnny Five Blinks!",
as the goals remain similar:

Giving remote access to all features of the Raspberry Pi:
- Small footprint in size, energy use and cost
- Full GPIO accessibility
- Advanced camera functions
- Endless customizability

The project is currently in the development stage, but can be deployed to Heroku by using a service like ngrok.
Both the back-end server and the mock front-end "client" are included in this repo.

Starting the back-end server: NPM run hack
Starting the front-end client: NPM start

Note: If deployed to Heroku, all other scripts besides "NPM start" might have to be taken out of the package.json

Dependencies used at the current stage:
- Raspberry Pi OS
- Node.js
- React
- Axios
- Express Server
- Cors
- ffmpeg.wasm (not yet implemented)
- onoff
- Liquid Crystal
- pi-camera-connect

Hardware used:
- Raspberry Pi 4, 4GB RAM, 
- 32gb microSD
- Breadboard with GPIO extension Shield
- 1080P 5M Camera
- I2C LCD1602 - Display



Further Documentation:
- http://johnny-five.io/ (not used in the current version)
- https://github.com/fivdi/onoff
- https://www.npmjs.com/package/pi-camera-connect
- https://github.com/kevincastejon/js-raspberrypi-liquid-crystal
- https://github.com/fivdi/pigpio (not used in the current version)
- https://www.youtube.com/watch?v=TbFFW61KULI&t=1s (CodeChrysalis TechTalk "JavaScript for IoT" by Stefano Demichelis)



- https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams