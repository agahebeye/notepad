import React from "react";
import { NoteItem } from "~/components/NoteList";
// import { NoteList } from "~/components/NoteList";

import type { Note } from "~/types";

type MainProps = {
  openEditor: () => void;
  notes: Note[];
  addNote: () => void;
  setCurrentNoteId: React.Dispatch<React.SetStateAction<string | number>>;
};

export function Main(props: MainProps) {
  const noteElements = props.notes.map((note) => {
    return (
      <NoteItem
        note={note}
        key={note.id}
        setCurrentNoteId={props.setCurrentNoteId}
        openEditor={props.openEditor}
      />
    );
  });

  return (
    <main>
      {props.notes.length ? (
        <div>
          <header>
            <h1 className="category-title">All notes</h1>
            <div className="note-count">3 notes</div>
            <input
              className="input-search"
              placeholder="Search notes..."
              type="text"
            />
            <br />
            <br />
            <button onClick={props.addNote}>create note</button>
          </header>

          {noteElements}
        </div>
      ) : (
        <div>
          <div>You have not created any note.</div>
          <button onClick={props.addNote}>create one</button>
        </div>
      )}
    </main>
  );

  function openInEditor(event: React.MouseEvent) {
    event.preventDefault();
    console.log("open in editor");
    props.openEditor();
  }
}
