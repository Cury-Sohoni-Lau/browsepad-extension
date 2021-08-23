import React from "react";
import axios from "axios";
import host from "../config"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaTrash, FaPencilAlt } from "react-icons/fa";


export default function Note({ note, token, setShowEditForm, setSelectedNote}) {
   const handleShow = () => {
     console.log("clicked edit button")
     setSelectedNote(note)
     setShowEditForm(true)
  //   dispatch({ type: "SET_SELECTED_NOTE", payload: note });
  //   dispatch({ type: "TOGGLE_SHOW_EDIT_FORM" });
   };

  const handleDelete = async (e) => {
    const id = note.id;
    axios.delete(`${host}/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  return (
    <Card style={{ width: '25rem', margin: "0 auto" }}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>
          {note.content}
        </Card.Text>
        <Card.Link href={note.url}>{note.url}</Card.Link>
        <div className="note-buttons">
          <Button variant="danger" onClick={handleDelete}>
            <FaTrash />
          </Button>
          <Button variant="primary" onClick={handleShow}>
            <FaPencilAlt />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
