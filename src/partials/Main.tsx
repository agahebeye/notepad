import React from "react";
import { NoteList } from "~/components/NoteList";

type MainProps = {
  setOpen: (state: React.SetStateAction<boolean>) => void;
};

export function Main(props: MainProps) {
  return (
    <main>
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

      <NoteList setOpen={props.setOpen} />
    </main>
  );
}
