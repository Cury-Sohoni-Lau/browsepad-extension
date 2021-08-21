import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm"
import AddNoteForm from "./components/AddNoteForm";

function App() {
  const [token, setToken] = useState("");
  const [showRegistration, setShowRegistration] = useState(false)

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
      {!token && (showRegistration ? <RegisterForm setShowRegistration={setShowRegistration} setToken={setToken}/> : <LoginForm setToken={setToken} setShowRegistration={setShowRegistration} />)}
      { token && <AddNoteForm token={token}  /> }
      { token && <button onClick={logout}>Log out</button> }
    </div>
  );
}

export default App;
