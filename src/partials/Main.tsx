import React from "react";
import { NoteItem } from "~/components/NoteList";
// import { NoteList } from "~/components/NoteList";

import type { Note } from "~/types";

type MainProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notes: Note[];
};

export function Main(props: MainProps) {
  const noteElements = props.notes.map((note) => {
    return <NoteItem note={note} key={note.id} />;
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
            <button>create note</button>
          </header>

          {noteElements}
        </div>
      ) : (
        <div>
          <div>You have not created any note.</div>
          <button>create one</button>
        </div>
      )}
    </main>
  );

  function openInEditor(event: React.MouseEvent) {
    event.preventDefault();
    console.log("open in editor");
    props.setOpen(true);
  }
}
