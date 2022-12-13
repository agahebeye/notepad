import React, { useReducer } from "react";

import { Main } from "./partials/Main";
import { Editor } from "./partials/Editor";

import { initialState, reducer } from "./reducer";

export function Application() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <Main state={state} dispatch={dispatch} />
      <Editor state={state} dispatch={dispatch} />
    </div>
  );
}
