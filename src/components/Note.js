import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import host from "../config"

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
    <div>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <p>URL: {note.url}</p>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
      <Button variant="primary" onClick={handleShow}>
        Edit Note
      </Button>
    </div>
  );
}
