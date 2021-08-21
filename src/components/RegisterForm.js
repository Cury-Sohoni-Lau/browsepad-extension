import React from "react";
import { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import host from "../config"

export default function RegisterForm({setToken, setShowRegistration}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(`${host}/api/register`, {
      name,
      email,
      password,
    });
    const token = response.data.jwtToken;
    chrome.storage.local.set({ jwtToken: token }, () => {
      console.log("Fetched and stored token!");
    });
    setToken(token);
    chrome.runtime.sendMessage({loggedIn: true});
  };

  return (
    <Card style={{ width: "20rem", margin: "0 auto" }} className="test">
      <Card.Body>
        <Card.Title className="text-center">Register</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="mx-auto my-2">Name</Form.Label>
            <Form.Control
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label className="mx-auto my-2">Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Label className="mx-auto my-2">Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="mx-auto my-2">
            Submit
          </Button>
          <p>
            Already have an account?
            {" "}
            <button class="link-button" onClick={() => setShowRegistration(false)}>
              Login
            </button>
          </p>
        </Form>
      </Card.Body>
    </Card>
  );
}
