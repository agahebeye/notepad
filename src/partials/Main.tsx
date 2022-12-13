import React from "react";
import { NoteList } from "~/components/NoteList";

import type { Note } from "~/types";

type MainProps = {
  open: boolean;
  openEditor: () => void;
  notes: Note[];
  addNote: () => void;
  setCurrentNoteId: React.Dispatch<React.SetStateAction<string | number>>;
};

export function Main(props: MainProps) {
  if (props.open) {
    return <></>;
  }

  return (
    <main>
      <div>
        <header>
          <h1 className="category-title">All notes</h1>
          <div className="note-count">{props.notes.length} note(s)</div>
          <input
            className="input-search"
            placeholder="Search notes..."
            type="text"
          />
          <button onClick={props.addNote}>create note</button>
        </header>

        <NoteList
          notes={props.notes}
          openEditor={props.openEditor}
          setCurrentNoteId={props.setCurrentNoteId}
        />
      </div>
    </main>
  );
}
