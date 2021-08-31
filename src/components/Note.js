import React, { useState } from "react";
import axios from "axios";
import host from "../config";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import moment from "moment";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import ReactMarkdown from "react-markdown";
import ShareModal from "./ShareModal";

export default function Note({
  note,
  token,
  setShowEditForm,
  setSelectedNote,
  setShowShareSuccess,
}) {
  const [showUserName, setShowUserName] = useState(false);
  const handleShow = () => {
    console.log("clicked edit button");
    setSelectedNote(note);
    setShowEditForm(true);
  };

  const handleDelete = async (e) => {
    const id = note.id;
    await axios.delete(`${host}/api/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    window.location.reload();
  };

  return (
    <Card style={{ width: "90vw", margin: "0 auto" }}>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        {typeof note.image != "undefined" && (
          <div
            className="circle-pic profile-pic-small"
            style={{
              backgroundImage: `url(${note.image || "../profile-default.png"})`,
            }}
            onMouseEnter={() => setShowUserName(true)}
            onMouseLeave={() => setShowUserName(false)}
          ></div>
        )}
        {showUserName && (
          <p
            style={{
              position: "absolute",
              backgroundColor: "pink",
            }}
          >
            {note.name}
          </p>
        )}
        <ReactMarkdown>{note.content}</ReactMarkdown>
        <Card.Subtitle className="mb-2 text-muted">
          {"Created: " + moment(note.created_at).fromNow()}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          {"Modified: " + moment(note.modified_at).fromNow()}
        </Card.Subtitle>
        <LinkPreview url={note.url} width="55vw" />
        <div className="note-buttons">
          <Button variant="danger" onClick={handleDelete}>
            <FaTrash />
          </Button>
          <Button variant="primary" onClick={handleShow}>
            <FaPencilAlt />
          </Button>
          <ShareModal
            note={note}
            setShowShareSuccess={setShowShareSuccess}
            token={token}
          />
        </div>
      </Card.Body>
    </Card>
  );
}
