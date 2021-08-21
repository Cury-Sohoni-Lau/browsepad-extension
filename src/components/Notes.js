import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from "./Note";
import EditNoteForm from "./EditNoteForm"
import host from "../config"

export default function Notes({token}) {
  const [selectedNote, setSelectedNote] = useState({})
  const [notes, setNotes] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    const showNotes = async (url) => {
      const response = await axios.post(`${host}/api/notes/url`, { url }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    };
      chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        const url  = tabs[0].url;
        showNotes(url);
      });
  }, []);

  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} note={note} token={token} setSelectedNote={setSelectedNote} setShowEditForm={setShowEditForm}/>
      ))}
      <EditNoteForm token={token} showEditForm={showEditForm} setShowEditForm={setShowEditForm} selectedNote={selectedNote} />
    </div>
  );
}
