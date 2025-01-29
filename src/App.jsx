import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="heading">AI Chat Bot</h1>
      <div className="chatbot_container">

        <div className="chatbot_response">
          <p>Hi, how can I help you today?</p>
        </div>

        <div className="chatbot_input">

          <input type="text" name="input" placeholder="enter your questions" className="input"/>
          <button type="button" >submit</button>
        </div>

      </div>
    </>
  );
}

export default App;
