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

const logout = () => {
  chrome.storage.local.remove(["jwtToken"], () => {
    console.log("removing the JWT token and timestamp")
    setToken("")
  })
}

  return (
    <div className="App">
      {!token ? <LoginForm setToken={setToken} /> : <p>You are logged in.</p>}
      { token && <button onClick={logout}>Log out</button> }
    </div>
  );
}

export default App;
