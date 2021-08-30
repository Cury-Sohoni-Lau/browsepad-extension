import React, { useEffect, useState } from "react";
import axios from "axios";
import Note from "./Note";
import EditNoteForm from "./EditNoteForm"
import host from "../config"

export default function Notes({token}) {
  const [selectedNote, setSelectedNote] = useState({})
  const [notes, setNotes] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
    showNotes(tab.url);
    
    async function showNotes(url) {
      const response = await axios.post(`${host}/api/notes/url`, { url }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
      console.log(response.data.length);
      // set the response.data.length in local storage...
      
    };
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
