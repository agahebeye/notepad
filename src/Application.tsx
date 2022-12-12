import React from "react";
import { nanoid } from "nanoid";

import { Main } from "./partials/Main";
import { Editor } from "./partials/Editor";

import type { Note } from "./types";

export function Application() {
  const [open, setOpen] = React.useState(false);

  const [notes, setNotes] = React.useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes.length && notes[0].id) || 0
  );

  return (
    <div className="app">
      {!open && (
        <Main
          openEditor={openEditor}
          notes={notes}
          addNote={addNote}
          setCurrentNoteId={setCurrentNoteId}
        />
      )}

      {open && (
        <Editor
          closeEditor={closeEditor}
          currentNote={findCurrentNote()}
          setNotes={setNotes}
        />
      )}
    </div>
  );

  function closeEditor() {
    setOpen(false);
  }

  function openEditor() {
    setOpen(true);
  }

  function addNote() {
    const note: Note = {
      title: "Enter your title",
      id: nanoid(),
      description: "",
      createdAt: new Date().toDateString(),
      text: "type your text here",
      favourite: false,
    };

    setNotes((prevNotes) => [...prevNotes, note]);
    setCurrentNoteId(note.id);
    openEditor();
  }

  function findCurrentNote() {
    return notes.find((note) => note.id === currentNoteId);
  }
}
