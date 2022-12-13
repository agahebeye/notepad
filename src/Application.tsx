import React, { useReducer } from "react";

import { Main } from "./partials/Main";
import { Editor } from "./partials/Editor";

import { initialState, reducer } from "./reducer";

export function Application() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log("application rendered");
  return (
    <div className="app">
      {!state.editorOpen && <Main state={state} dispatch={dispatch} />}
      {state.editorOpen && <Editor state={state} dispatch={dispatch} />}
    </div>
  );
}
