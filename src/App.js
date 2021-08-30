import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm"
import AddNoteForm from "./components/AddNoteForm";
import Notes from "./components/Notes";
import Button from "react-bootstrap/Button";
import axios from "axios";
import host from "./config"


function App() {
  const [token, setToken] = useState("");
  const [showRegistration, setShowRegistration] = useState(false)

  const storeUserAndToken = async (result) => {
    let existingToken = result.jwtToken;
    if (existingToken) {
      try {
        const response = await axios.get(`${host}/api/getuser`, {
          headers: { Authorization: `Bearer ${existingToken}`}
        })
        const user = response.data;
        if (user.new_token) {
          console.log("hey you got a new token ", user.new_token)
          existingToken = user.new_token;
          chrome.storage.local.set({jwtToken: existingToken});
        }
        setToken(existingToken);
      } catch (err) {
        setToken("");
        chrome.storage.local.set({jwtToken: ""});
        console.log("The token value is now ", token)
        console.log(err);
      }
    }
  }

  useEffect(() => {
    chrome.storage.local.get(["jwtToken"], (result) => {
      console.log("result is ", result)
      storeUserAndToken(result)
      // console.log("Value currently is " + result.jwtToken);
      // setToken(result.jwtToken);
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
