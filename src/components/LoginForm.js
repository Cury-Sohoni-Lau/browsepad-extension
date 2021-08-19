import React, { useState } from "react";
import axios from "axios";

export default function LoginForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://ec2-52-14-255-9.us-east-2.compute.amazonaws.com/api/login",
      {
        email,
        password,
      }
    );
    const token = response.data.jwtToken;
    chrome.storage.local.set({ jwtToken: token }, () => {
      console.log("Fetched and stored token!");
    });
    setToken(token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          placeholder="adams@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
