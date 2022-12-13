import React from "react";

import { initialState } from "~/reducer";
import type { ActionType } from "~/reducer";
import { Category } from "~/types";

type EditorProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

type EditorInput = HTMLInputElement | HTMLTextAreaElement;

export function Editor(props: EditorProps) {
  const currentNote = props.state.notes.find(
    (note) => note.id === props.state.currentNoteId
  );

  const categoryElements = props.categories.map((category) => {
    return (
      <option value={category.id} key={category.id}>
        {category.name}
      </option>
    );
  });

  console.log("editor rendered");

  return (
    <div className="editor">
      <form className="editorForm" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder=""
          name="title"
          onChange={handleChange}
          value={currentNote?.title}
        />

        <select name="category">{categoryElements}</select>

        <textarea
          name="text"
          value={currentNote?.text}
          onChange={handleChange}
        />
      </form>

      <button
        onClick={() => props.dispatch({ type: "closeEditor", payload: false })}
      >
        finish
      </button>
    </div>
  );

  function handleChange(event: React.ChangeEvent<EditorInput>) {
    const { name, value } = event.target;

    const newNotes = props.state.notes.map((note) => {
      return note.id === currentNote?.id ? { ...note, [name]: value } : note;
    });

    props.dispatch({ type: "setNotes", payload: newNotes });
  }
}
