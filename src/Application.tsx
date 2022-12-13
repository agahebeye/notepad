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
      <Main state={state} dispatch={dispatch} />

      <Editor
        open={state.editorOpen}
        closeEditor={() => dispatch({ type: "closeEditor", payload: false })}
        currentNote={findCurrentNote()}
        setNotes={setNotes}
      />
    </div>
  );

  function findCurrentNote() {
    return notes.find((note) => note.id === currentNoteId);
  }
}
