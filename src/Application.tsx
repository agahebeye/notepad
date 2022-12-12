import { Main } from "./partials/Main";
import { Editor } from "./partials/Editor";
import React from "react";

export function Application() {
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);

  return (
    <div className="app">
      {!isEditorOpen && <Main openEditor={openEditor} />}
      {isEditorOpen && <Editor closeEditor={closeEditor} />}
    </div>
  );

  function openEditor() {
    setIsEditorOpen((prevOpen) => (prevOpen = true));
  }

  function closeEditor() {
    setIsEditorOpen((prevOpen) => (prevOpen = false));
  }
}
