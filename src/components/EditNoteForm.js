import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import host from "../config"

export default function EditNoteForm({token, selectedNote, setShowEditForm, showEditForm}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const handleClose = () => {
    setShowEditForm(false)
  }

  const handleSubmit = async (e) => {
    const id = selectedNote.id;
    await axios.patch(
      `${host}/api/notes/${id}`,
      {
        title: title,
        content: content,
        url: url,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setShowEditForm(false)
    window.location.reload();
  };

  useEffect(() => {
    setTitle(selectedNote.title);
    setContent(selectedNote.content);
    setUrl(selectedNote.url);
  }, [selectedNote]);

  return (
    <Modal show={showEditForm} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Title</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <p>Content</p>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <p>URL</p>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
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
  );
}
