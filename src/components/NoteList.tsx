import React from "react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Highlighter from "react-highlight-words";

import { ActionType } from "~/reducer";
import type { Note } from "~/types";

type NoteItemProps = {
  notes: Note[];
  searchKeyword: string;
  dispatch: React.Dispatch<ActionType>;
};

export function NoteList(props: NoteItemProps) {
  const [canDelete, setCanDelete] = React.useState(false);
  const searchWords = [...new Set(props.searchKeyword.split(""))];

  return (
    <div className="space-y-4 h-[300px] overflow-y-auto p-4">
      {props.notes.map((note) => {
        return (
          <article
            className="bg-white p-4 text-gray-800 shadow-md rounded-lg border"
            key={note.id}
            onMouseEnter={() => setCanDelete(true)}
            onMouseLeave={() => setCanDelete(false)}
          >
            <div className="flex justify-between">
              <h3 className={`text-xl ${note.deletedAt && "line-through"}`}>
                <a href="" onClick={(event) => openInEditor(event, note)}>
                  <Highlighter
                    highlightClassName="bg-blue-400 text-white font-bold"
                    searchWords={searchWords}
                    textToHighlight={note.title}
                  />
                </a>
              </h3>

              {canDelete && (
                <button onClick={() => deleteNote(note)}>
                  <XMarkIcon className="w-5 h-5 text-blue-400" />
                </button>
              )}
            </div>

            <div className="text-[11px] flex justify-between mt-2">
              <time dateTime={note.createdAt}>{note.createdAt}</time>
              {note.favourite && (
                <StarIcon className="w-4 h-4 inline text-blue-400" />
              )}
            </div>
          </article>
        );
      })}
    </div>
  );

  function openInEditor(event: React.MouseEvent, note: Note) {
    event.preventDefault();

    if (note.deletedAt) return;

    props.dispatch({ type: "setCurrentNoteId", payload: note.id });
    props.dispatch({ type: "openEditor", payload: true });
  }

  function deleteNote(note: Note) {
    props.dispatch({ type: "deleteNote", payload: note });
  }
}
