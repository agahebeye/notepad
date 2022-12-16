import React from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";

import { NoteList } from "~/components/NoteList";
import { initialState } from "~/reducer";

import type { ActionType } from "~/reducer";
import { Note } from "~/types";

type MainProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
};

export function Main(props: MainProps) {
  const [keyword, setKeyword] = React.useState("");
  const [filters, setFilters] = React.useState([
    {
      key: "default",
      value: "All Notes",
    },
  ]);

  const searchedNotes = React.useMemo(() => {
    const regex = new RegExp(`${keyword}`, "ig");

    return keyword.length > 0
      ? props.state.notes.filter((note: Note) => {
          return note.title.match(regex);
        })
      : null;
  }, [keyword]);

  const noteCount = searchedNotes?.length ?? props.state.notes.length;

  console.log("main rendered");

  return props.state.notes.length > 0 ? (
    <div className="max-w-[500px] w-full px-8">
      <Listbox onChange={setFilters}>
        <div className="relative mt-1 text-sm w-36">
          <Listbox.Button className="relative w-full text-gray-700 cursor-default rounded-lg py-1 pl-3 pr-10 text-left border-blue-400 border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-xs">
            <span className="block truncate">{filters[0].value}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filters.map((filter, idx) => (
              <Listbox.Option
                key={idx}
                className="relative text-xs cursor-default select-none py-1 pl-10 pr-4 ui-active:bg-blue-100 ui-active:text-blue-600 ui-not-active:text-gray-900 ui-disabled:text-gray-400"
                value={filter}
              >
                <span className="block truncate ui-selected:font-medium font-normal">
                  {filter.value}
                </span>
                <span className="hidden absolute inset-y-0 left-0 ui-selected:flex items-center pl-3 text-blue-400">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

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

  function handleFiltersChange() {}
}
