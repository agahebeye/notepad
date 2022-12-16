import React from "react";
import { nanoid } from "nanoid";

import { NoteList } from "~/components/NoteList";
import { initialState } from "~/reducer";

import type { ActionType } from "~/reducer";

type MainProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
};

export function Main(props: MainProps) {
  const [keyword, setKeyword] = React.useState("");

  const searchedNotes = React.useMemo(() => {
    const regex = new RegExp(`${keyword}`, "ig");

    return keyword.length > 0
      ? props.state.notes.filter((note) => {
          return note.title.match(regex);
        })
      : null;
  }, [keyword]);

  const noteCount = searchedNotes?.length ?? props.state.notes.length;

  console.log("main rendered");

  return props.state.notes.length > 0 ? (
    <main>
      <div className="max-w-[600px] w-full px-8">
        <header className="space-y-3 mb-6">
          <div className="note-count">
            <span className="font-bold">{noteCount} </span>
            note(s)
          </div>

          <input
            className="input"
            placeholder="Search notes..."
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="button"
            onClick={() => {
              props.dispatch({ type: "openEditor", payload: true });
              props.dispatch({ type: "setCurrentNoteId", payload: undefined });
            }}
          >
            create note
          </button>
        </header>

        <NoteList
          notes={searchedNotes ?? props.state.notes}
          dispatch={props.dispatch}
        />
      </div>
    </main>
  ) : (
    <div className="text-center space-y-4">
      <div>You have not created any note.</div>
      <button
        onClick={() => props.dispatch({ type: "openEditor", payload: true })}
        type="button"
        className="button"
      >
        Create one
      </button>
    </div>
  );
}
