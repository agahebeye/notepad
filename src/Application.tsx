import React from "react";
import { nanoid } from "nanoid";

import { Main } from "./partials/Main";
import { Editor } from "./partials/Editor";

import { initialState, reducer } from "./reducer";
import { categories as initialCategories } from "./data";
import { Category, Note } from "./types";

export function Application() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [categories, setCategories] =
    React.useState<Category[]>(initialCategories);

  console.log("application rendered");

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      {state.notes.length > 0 ? (
        <>
          {!state.editorOpen && (
            <Main state={state} dispatch={dispatch} addNote={addNote} />
          )}
          {state.editorOpen && (
            <Editor
              state={state}
              dispatch={dispatch}
              categories={categories}
              setCategories={setCategories}
            />
          )}
        </>
      ) : (
        <div className="text-center space-y-4">
          <div>You have not created any note.</div>
          <button
            onClick={addNote}
            type="button"
            className="px-6 py-3 text-xs font-medium uppercase tracking-wide rounded bg-blue-400 text-white"
          >
            Create one
          </button>
        </div>
      )}
    </div>
  );

  function addNote() {
    const note: Note = {
      title: "",
      id: nanoid(),
      description: "",
      createdAt: new Date().toDateString(),
      text: "",
      favourite: false,
      category: "No category",
    };

    dispatch({ type: "addNote", payload: note });
    dispatch({ type: "openEditor", payload: true });
  }
}
