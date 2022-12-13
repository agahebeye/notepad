import React, { useContext } from "react";
import { ActionType } from "~/reducer";
import type { Note } from "~/types";

type NoteItemProps = {
  notes: Note[];
  dispatch: React.Dispatch<ActionType>;
};

export function NoteList(props: NoteItemProps) {
  return (
    <React.Fragment>
      {props.notes.map((note) => {
        return (
          <article className="note" key={note.id}>
            <h3 className="note--tile">
              <a href="#" onClick={(event) => openInEditor(event, note.id)}>
                {note.title}
              </a>
            </h3>
            <div className="note--description">Lorem, ipsum dolor.</div>
            <div className="note--date">December 10</div>
          </article>
        );
      })}
    </React.Fragment>
  );

  function openInEditor(event: React.MouseEvent, id: string | number) {
    event.preventDefault();
    props.dispatch({ type: "setCurrentNoteId", payload: id });
    props.dispatch({ type: "openEditor", payload: true });
  }
}
