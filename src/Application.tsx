import React from "react";
import { nanoid } from "nanoid";

import { Main } from "./partials/Main";
import { Editor } from "./partials/Editor";

import { initialState, reducer } from "./reducer";

export function Application() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  console.log("application rendered");

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      {!state.editorOpen && <Main state={state} dispatch={dispatch} />}
      {state.editorOpen && <Editor state={state} dispatch={dispatch} />}
    </div>
  );

  function addNote() {
    const note = {
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
