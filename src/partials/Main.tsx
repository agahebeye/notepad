import React from "react";

import { NoteList } from "~/components/NoteList";
import { FilterListBox } from "~/components/FilterListBox";
import { initialState } from "~/reducer";
import { initialFilters } from "~/data";

import type { ActionType } from "~/reducer";
import { Category, Note } from "~/types";

type MainProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
};

export function Main(props: MainProps) {
  const filters = [
    ...initialFilters,
    ...props.state.categories.map((category: Category) => ({
      key: "category",
      value: category.name,
    })),
  ];

  const [keyword, setKeyword] = React.useState("");
  const [filtered, setFiltered] = React.useState(filters[0]);

  const defaultNotes = props.state.notes.filter((note) => !note.deletedAt);
  const filteredNotes = getFilteredNotes();
  const notes =
    filtered.value === "All Notes" && keyword.length < 1
      ? defaultNotes
      : filteredNotes;

  const resultsText = (
    <span>
      {keyword.length > 0 && " found "}
      {filtered.value !== "All Notes" && (
        <span>
          in{" "}
          <strong className="bg-blue-400 px-0.5 text-white">
            {filtered.value}
          </strong>{" "}
          category
        </span>
      )}
    </span>
  );

  console.log("main rendered");

  return props.state.notes.length > 0 ? (
    <div className="max-w-[500px] w-full px-8">
      <FilterListBox
        items={filters}
        filtered={filtered}
        onChange={setFiltered}
      />

      <header className="space-y-4 my-6">
        <div className="text-sm">
          <span className="font-bold">{notes.length}</span>
          <span> note(s)</span>
          {resultsText}
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
        notes={notes}
        searchKeyword={keyword}
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

  function getFilteredNotes() {
    return React.useMemo(() => {
      let results = props.state.notes;

      if (keyword.length > 0) {
        const regex = new RegExp(`${keyword}`, "ig");

        results = results.filter((note) => {
          return note.title.match(regex);
        });
      }

      switch (filtered.key) {
        case "category":
          results = results.filter((note) => note.category === filtered.value);
          break;
        case "favourite":
          results = results.filter((note) => note.favourite);

          break;
        case "deleted":
          results = results.filter((note) => note.deletedAt);
          break;
      }

      return results;
    }, [keyword, filtered, props.state.notes]);
  }
}
