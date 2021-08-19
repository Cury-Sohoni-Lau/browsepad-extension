import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    chrome.storage.local.get(["jwtToken"], (result) => {
      console.log("Value currently is " + result.jwtToken);
      setToken(result.jwtToken);
    });
  }, []);

  return (
    <div className="App">
      {!token ? <LoginForm setToken={setToken} /> : <p>You are logged in.</p>}
    </div>
  );
}

export default App;
