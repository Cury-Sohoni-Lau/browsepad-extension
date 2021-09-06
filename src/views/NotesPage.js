import React, { useContext } from "react";
import Notes from "../components/Notes";
import { Context } from "../Store";

export default function NotesPage() {
  const [state] = useContext(Context);

  return (
    <div style={{overflowY: "scroll"}}>
      <Notes />
    </div>
  );
}
