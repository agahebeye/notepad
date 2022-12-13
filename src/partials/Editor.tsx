import React from "react";

import { initialState } from "~/reducer";
import type { ActionType } from "~/reducer";

type EditorProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
};

type EditorInput = HTMLInputElement | HTMLTextAreaElement;

export function Editor(props: EditorProps) {
  const currentNote = props.state.notes.find(
    (note) => note.id === props.state.currentNoteId
  );

  console.log("editor rendered");

  return (
    <div className="editor">
      <form className="editor--form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder=""
          name="title"
          onChange={handleChange}
          value={currentNote?.title}
        />
        <br />
        <textarea
          name="text"
          value={currentNote?.text}
          onChange={handleChange}
        />
      </form>

      <button
        onClick={() => props.dispatch({ type: "closeEditor", payload: false })}
      >
        finish
      </button>
    </div>
  );

  function handleChange(event: React.ChangeEvent<EditorInput>) {
    const { name, value } = event.target;

    const newNotes = props.state.notes.map((note) => {
      return note.id === currentNote?.id ? { ...note, [name]: value } : note;
    });

    props.dispatch({ type: "setNotes", payload: newNotes });
  }
}
