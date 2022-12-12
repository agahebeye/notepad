import React from "react";
import type { Note } from "~/types";

type EditorProps = {
  currentNote: Note | undefined;
  closeEditor: () => void;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};

type EditorInput = HTMLInputElement | HTMLTextAreaElement;

export function Editor(props: EditorProps) {
  return (
    <div className="editor">
      <button onClick={props.closeEditor}>close</button>

      <form className="editor--form">
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
