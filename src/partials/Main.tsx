import React from "react";
import { nanoid } from "nanoid";

import { NoteList } from "~/components/NoteList";
import { initialState } from "~/reducer";

import type { ActionType } from "~/reducer";
import type { Note } from "~/types";

type MainProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
};

export function Main(props: MainProps) {
  if (props.state.editorOpen) {
    return <></>;
  }

  return (
    <main>
      {props.state.notes.length > 0 ? (
        <div>
          <header>
            <h1 className="category-title">All notes</h1>
            <div className="note-count">{props.state.notes.length} note(s)</div>
            <input
              className="input-search"
              placeholder="Search notes..."
              type="text"
            />
            <button onClick={addNote}>create note</button>
          </header>

          <NoteList notes={props.state.notes} dispatch={props.dispatch} />
        </div>
      ) : (
        <div>
          <div>You have not created any note.</div>
          <button onClick={addNote}>create one</button>
        </div>
      )}
    </main>
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

    props.dispatch({ type: "addNote", payload: note });
    props.dispatch({ type: "openEditor", payload: true });
  }
}
