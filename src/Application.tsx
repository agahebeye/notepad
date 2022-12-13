import React, { useReducer } from "react";
import { nanoid } from "nanoid";

import { Main } from "./partials/Main";
import { Editor } from "./partials/Editor";

import type { Note } from "./types";
import { initialState, reducer } from "./reducer";

export function Application() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [notes, setNotes] = React.useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = React.useState(
    (notes.length && notes[0].id) || 0
  );

  return (
    <div className="app">
      {notes.length > 0 ? (
        <React.Fragment>
          <Main
            open={state.editorOpen}
            openEditor={() => dispatch({ type: "openEditor", payload: true })}
            notes={notes}
            addNote={addNote}
            setCurrentNoteId={setCurrentNoteId}
          />

          <Editor
            open={state.editorOpen}
            closeEditor={() =>
              dispatch({ type: "closeEditor", payload: false })
            }
            currentNote={findCurrentNote()}
            setNotes={setNotes}
          />
        </React.Fragment>
      ) : (
        <div>
          <div>You have not created any note.</div>
          <button onClick={addNote}>create one</button>
        </div>
      )}
    </div>
  );

  function addNote() {
    const note: Note = {
      title: "Enter your title",
      id: nanoid(),
      description: "",
      createdAt: new Date().toDateString(),
      text: "type your text here",
      favourite: false,
    };

    setNotes((prevNotes) => [note, ...prevNotes]);
    setCurrentNoteId(note.id);
    dispatch({ type: "openEditor", payload: true });
  }

  function findCurrentNote() {
    return notes.find((note) => note.id === currentNoteId);
  }
}
