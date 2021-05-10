import axios from 'axios'
import './styles/App.css';

export default function LCD({
    lineOne,
    setLineOne,
    lineTwo,
    setLineTwo
}) {
    
    async function buttonSubmit() {
        console.log(lineOne, lineTwo)
        
        const res = axios({
            method: 'post',
            url: `${process.env.REACT_APP_URL}/api/lcd/update`,
            data: { inputOne: lineOne, inputTwo: lineTwo}
        })

        console.log("Response received: ", res.status)

    }

    async function buttonClear() {
      const res = await fetch(`${process.env.REACT_APP_URL}/api/lcd/clear`)
      console.log("Response received: ", res.status)  
    }


    return (
      <>
        <div>
            <h1>
              LCD controls
            </h1>
            <form>
                <label htmlFor="lineOne">Line One:</label>
                <input type="text" id="lineOne" name="lineOne" maxLength="16" onChange={(e) => setLineOne(e.target.value)}/><br/>
                <label htmlFor="lineTwo">Line Two:</label>
                <input type="text" id="lineTwo" name="lineTwo" maxLength="16" onChange={(e) => setLineTwo(e.target.value)}/><br/>
            </form>
            <button className="submitButton" onClick={() => buttonSubmit()}>Submit</button>
            <button className="submitButton" onClick={() => buttonClear()}>Clear Screen</button>
        </div>
      </>
    );
  }