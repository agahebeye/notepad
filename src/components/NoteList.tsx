import React, { useContext } from "react";
import type { Note } from "~/types";

type NoteItemProps = {
  note: Note;
  setCurrentNoteId: React.Dispatch<React.SetStateAction<string | number>>;
  openEditor: () => void;
};

export function NoteItem(props: NoteItemProps) {
  return (
    <article className="note">
      <h3 className="note--tile">
        <a href="#" onClick={openInEditor}>
          {props.note.title}
        </a>
      </h3>
      <div className="note--description">Lorem, ipsum dolor.</div>
      <div className="note--date">December 10</div>
    </article>
  );

  function openInEditor(event: React.MouseEvent) {
    event.preventDefault();
    props.setCurrentNoteId(props.note.id);
    props.openEditor();
    console.log("sure");
  }
}
