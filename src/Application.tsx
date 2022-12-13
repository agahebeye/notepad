import React from "react";

import { Main } from "./partials/Main";
import { Editor } from "./partials/Editor";

import { initialState, reducer } from "./reducer";
import { categories as initialCategories } from "./data";
import { Category } from "./types";

export function Application() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [categories, setCategories] =
    React.useState<Category[]>(initialCategories);

  console.log("application rendered");

  return (
    <div className="app">
      {!state.editorOpen && <Main state={state} dispatch={dispatch} />}
      {state.editorOpen && (
        <Editor
          state={state}
          dispatch={dispatch}
          categories={categories}
          setCategories={setCategories}
        />
      )}
    </div>
  );
}
