import "./styles/camera.css";

export default function Camera({
    picPath, setPicPath, streamPath, setStreamPath, mockTest, setMockTest
    }) {  
        
    async function capturePic() {
        setStreamPath("")
        await fetch(`${process.env.REACT_APP_URL}/api/camera/pic`)
        .then(response => response.body)
        .then(rs => {
            const reader = rs.getReader();
            return new ReadableStream({
                async start(controller) {
                    while (true) {
                        const { done, value} = await reader.read();
                    if (done) {
                        break;
                    }
                        controller.enqueue(value);
                    }
                    controller.close();
                    reader.releaseLock();
                }
            })
        })
        .then(rs => new Response(rs))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => {
            console.log(url); setPicPath(url)})
        .catch(console.error)
    }

    async function captureStream() {
        console.log("captureStream is not working at the moment. Please delete comments in /src/Camera.jsx to continue development.")
        /*
        setPicPath("")
        
        await fetch(`${process.env.REACT_APP_URL}/api/camera/startstream`)
         .then(response => response.body)
         .then(rs => {
            console.log("Hi") 
            const reader = rs.getReader();
             return new ReadableStream({
                 async start(controller) {
                     while (true) {
                         const { done, value} = await reader.read();
                        if (done) {
                            console.log("Done, ", controller)
                            break;
                        }
                            console.log("Not done yet, ", value)
                            controller.enqueue(value);
                        }
                     controller.close();
                     reader.releaseLock();
                 }
             })
         })
         .then(rs => new Response(rs))
         .then(response => response.blob())
         .then(blob => URL.createObjectURL(blob))
         .then(url => {
             console.log(url); setStreamPath(url)})
         .catch(console.error)
        
    */
    }

    async function stopStream() {
        console.log("stopStream is not working at the moment. Please delete comments in /src/Camera.jsx to continue development.")
        /*
        await fetch(`${process.env.REACT_APP_URL}/api/camera/stopstream`)
        */
    }

    async function testVideo() {
        
        setPicPath("")
        setStreamPath("")
        
        await fetch(`${process.env.REACT_APP_URL}/api/camera/test`)
         .then(response => response.body)
         .then(rs => {
            console.log("Hi") 
            const reader = rs.getReader();
             return new ReadableStream({
                 async start(controller) {
                     while (true) {
                         const { done, value} = await reader.read();
                        if (done) {
                            console.log("Done, ", controller)
                            break;
                        }
                            console.log("Not done yet, ", value)
                            controller.enqueue(value);
                        }
                     controller.close();
                     reader.releaseLock();
                 }
             })
         })
         .then(rs => new Response(rs))
         .then(response => response.blob())
         .then(blob => URL.createObjectURL(blob))
         .then(url => {
             console.log(url); setStreamPath(url)})
         .catch(console.error) 
    }

    async function testStream() {
        setPicPath("")
        setStreamPath("")
        for (let i = 0; i < 15; i++) {
                await fetch(`${process.env.REACT_APP_URL}/api/camera/pic`)
                .then(response => response.body)
                .then(rs => {
                    const reader = rs.getReader();
                    return new ReadableStream({
                        async start(controller) {
                            while (true) {
                                const { done, value} = await reader.read();
                            if (done) {
                                break;
                            }
                                controller.enqueue(value);
                            }
                            controller.close();
                            reader.releaseLock();
                        }
                    })
                })
                .then(rs => new Response(rs))
                .then(response => response.blob())
                .then(blob => URL.createObjectURL(blob))
                .then(url => {
                    console.log(url); setPicPath(url)})
                .catch(console.error);
                await new Promise(resolve => setTimeout(() => resolve(), 1000));
            }
            console.log("Loop done.")
        }
    
    async function reactTest() {
        await fetch(`${process.env.REACT_APP_URL}/api/notes`)
        .then(rs => setMockTest(rs))
    }

    return (
      <>
        <div>
          <h1>
              Camera Control
          </h1>
          <button className="button" onClick={() => capturePic()}>Capture Pic</button>
          <button className="button" onClick={() => testVideo()}>Test Video</button>
          <button className="button" onClick={() => testStream()}>Test Stream</button>
          <br/>
          <br/>
          <img id="pic" src={picPath} height="360" width="480" alt="Snapshot of the Raspi Camera"></img> 
          <video id="vid" height="360" width="480" src={streamPath} autoPlay muted/>
          <button hidden className="button" onClick={() => captureStream()}>Capture Stream</button>
          <button hidden className="button" onClick={() => stopStream()}>Stop Stream</button>
          <button hidden className="button" data-testid="mockTestButton" onClick={() => reactTest()}>{mockTest}</button>
        </div>
      </>
    );
  }
