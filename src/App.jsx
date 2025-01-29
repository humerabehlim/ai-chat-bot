import { useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SyncLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App() {
  const apiKey = import.meta.env.VITE_API_GEMINI_KEY;

  // store data use state hook
  // destructuring the useState into prompt and setPrompt
  // prompt is the input from the user
  // setPrompt is the function that used to update the prompt
  const [prompt, setPrompt] = useState("");

  // store the response from the user and show on screen using useState
  // array of object is used to store the prompt and response
  const [response, setResponse] = useState([
    {
      prompt: "Hi, how can I help you today?",
      response: "I am a chatbot, ask me anything.",
    },
  ]);

  let [loading, setLoading] = useState(false);

  async function fetchChatResponseFromGemini() {
    setLoading(true);
    // create an instance of the GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(apiKey);
    // we have selected the model "gemini-1.5-flash"
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // we have given the prompt to the model and it will generate the response
    const result = await model.generateContent(prompt);
    // we will get the response from the model
    console.log(result.response.text());
    // ... spread operator is used to copy the previous response and add the new response
    setResponse([
      ...response,
      { prompt: prompt, response: result.response.text() },
    ]);
    setPrompt("");
    setLoading(false);
  }

  return (
    <>
      <h1 className="heading">AI Chat Bot</h1>
      <div className="chatbot_container">
        <div className="chatbot_response_container">
          {/* map to show the data from the response array state */}
          {response.map((res, index) => (
            <div key={index} className="response">
              <p className="chatbot_prompt">
                <strong>user : </strong> {res.prompt}
              </p>
              <p className="chatbot_response">
                <strong>chatbot : </strong> {res.response}
              </p>
            </div>
          ))}

          {loading && (
            <SyncLoader
              color={"chocolate"}
              loading={loading}
              cssOverride={override}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>

        <div className="chatbot_input">
          <input
            type="text"
            name="input"
            placeholder="enter your questions"
            className="input"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />
          <button type="button" onClick={fetchChatResponseFromGemini}>
            submit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
