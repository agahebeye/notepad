import React from "react";

import { initialState } from "~/reducer";

import type { ActionType } from "~/reducer";
import type { Note } from "~/types";

type EditorProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
  currentNote: Note | undefined;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

type EditorInput = HTMLInputElement | HTMLTextAreaElement;

export function Editor(props: EditorProps) {
  if (!props.state.editorOpen) {
    return <></>;
  }

  return (
    <div className="editor">
      <form className="editor--form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder=""
          name="title"
          onChange={handleChange}
          value={props.currentNote?.title}
        />
        <br />
        <textarea
          name="text"
          value={props.currentNote?.text}
          onChange={handleChange}
        />
      </form>

      <button
        onClick={() => props.dispatch({ type: "closeEditor", payload: false })}
      >
        close
      </button>
    </div>
  );

  function handleChange(event: React.ChangeEvent<EditorInput>) {
    const { name, value } = event.target;

    props.setNotes((prevNotes) => {
      const newNotes = prevNotes.map((note) => {
        return note.id === props.currentNote?.id
          ? { ...note, [name]: value }
          : note;
      });

      return newNotes;
    });
  }
}
