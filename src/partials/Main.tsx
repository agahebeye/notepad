import React from "react";

import { NoteList } from "~/components/NoteList";
import { FilterListBox } from "~/components/FilterListBox";
import { initialState } from "~/reducer";

import type { ActionType } from "~/reducer";
import { Category, Note } from "~/types";

type MainProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
};

export function Main(props: MainProps) {
  const filters = [
    {
      key: "all Notes",
      value: "All Notes",
    },
    {
      key: "favourite",
      value: "Favourite",
    },
    {
      key: "deleted",
      value: "Deleted",
    },
    {
      key: "category",
      value: "Categories",
    },
  ].concat(
    props.state.categories.map((category: Category) => ({
      key: "category",
      value: category.name,
    }))
  );

  const [keyword, setKeyword] = React.useState("");
  const [filtered, setFiltered] = React.useState(filters[0]);

  const searchedNotes = React.useMemo(() => {
    let results = [] as Note[];

    if (keyword.length > 0) {
      const regex = new RegExp(`${keyword}`, "ig");

      console.log(filtered);

      return props.state.notes.filter((note: Note) => {
        return note.title.match(regex);
      });
    }

    return results;
  }, [keyword, filtered]);

  const noteCount = searchedNotes?.length ?? props.state.notes.length;

  console.log("main rendered");

  return props.state.notes.length > 0 ? (
    <div className="max-w-[500px] w-full px-8">
      <FilterListBox
        items={filters}
        filtered={filtered}
        onChange={setFiltered}
      />

      <header className="space-y-3 my-6">
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
