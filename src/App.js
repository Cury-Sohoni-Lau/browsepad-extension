import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm"
import AddNoteForm from "./components/AddNoteForm";
import Notes from "./components/Notes";
import Button from "react-bootstrap/Button";

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
    window.location.reload();
  }

  return (
    <div className="App">
      {!token && (showRegistration ? <RegisterForm setShowRegistration={setShowRegistration} setToken={setToken} /> : <LoginForm setToken={setToken} setShowRegistration={setShowRegistration} />)}
      { token && <>
        <AddNoteForm token={token} />
        <Notes token={token} />
        <Button id="button-logout" onClick={logout}>Log out</Button></>}
    </div>
  );
}

export default App;
