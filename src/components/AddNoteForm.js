import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import host from "../config";

export default function AddNoteForm( {token, setShowRegistration} ) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    await axios.post(
      `${host}/api/notes`,
      {
        title: title,
        content: content,
        url: url,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setShow(false);
    console.log("url was set to", url)
    window.location.reload();
  };

  useEffect(async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    console.log(tab.url)
    setUrl(tab.url);
  }, [])

  return (
    <>
      <Button id="add-button" onClick={handleShow}>
        <FaPlus />
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Title</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <p>Content</p>
          <textarea
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
