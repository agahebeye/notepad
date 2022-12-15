import React, { useContext } from "react";
import { ActionType } from "~/reducer";
import type { Note } from "~/types";

type NoteItemProps = {
  notes: Note[];
  dispatch: React.Dispatch<ActionType>;
};

export function NoteList(props: NoteItemProps) {
  return (
    <div className="space-y-4 h-[300px] overflow-y-auto p-4">
      {props.notes.map((note) => {
        return (
          <article
            className="bg-white p-4 text-gray-800 shadow-md rounded-lg border"
            key={note.id}
          >
            <h3 className="text-xl">
              <a href="" onClick={(event) => openInEditor(event, note.id)}>
                {note.title}
              </a>
            </h3>

            <div className="text-sm mt-1 mb-1"></div>

            <div className="text-xs flex justify-between">December 10</div>
          </article>
        );
      })}
    </div>
  );

  function openInEditor(event: React.MouseEvent, id: string | number) {
    event.preventDefault();
    props.dispatch({ type: "setCurrentNoteId", payload: id });
    props.dispatch({ type: "openEditor", payload: true });
  }
}
