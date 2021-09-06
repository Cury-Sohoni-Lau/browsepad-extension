import React, { useEffect, useContext, useState } from "react";
import { Context } from "../Store";
import axios from "axios";
import Note from "./Note";
import AddNoteForm from "./AddNoteForm";
import { extractHashtags, host } from "../utils";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ToggleSharedNotesButton from "./ToggleSharedNotesButton";
import useStyles from "../styles";

export default function Notes() {
  const classes = useStyles();
  let parentMatch = useRouteMatch();
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (state.token) {
      const setNotes = async () => {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        const url = tab.url;
        let response = await axios.get(`${host}/api/notes`, {
          headers: { Authorization: `Bearer ${state.token}` },
        });

        let myNotes = response.data;
        myNotes = myNotes.filter((note) => note.url === url);
        myNotes = myNotes.map((note) => {
          return {
            ...note,
            hashtags: extractHashtags(note) || [],
          };
        });
        dispatch({ type: "SET_MY_NOTES", payload: myNotes });
        dispatch({ type: "SET_NOTES", payload: myNotes });

        response = await axios.get(`${host}/api/notes/shared`, {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        let sharedNotes = response.data;
        sharedNotes = sharedNotes.filter((note) => note.url === url);
        sharedNotes = sharedNotes.map((note) => {
          return {
            ...note,
            hashtags: extractHashtags(note) || [],
          };
        });
        dispatch({ type: "SET_SHARED_NOTES", payload: sharedNotes });
      };
      setNotes();
    }
  }, [state.token, dispatch, state.refresh]);

  return (
    <div>
      <div id="notes-main" style={{ display: "flex" }}>
        <div id="notes-wrapper">
          <ToggleSharedNotesButton />
          <div>
            {state.filteredNotes.map((note) => (
              <Note
                key={note.id}
                passedNote={note}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
