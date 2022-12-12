import React from "react";
import ReactDOM from "react-dom/client";
import { Application } from "./Application";
// import { NoteProvider } from "./providers/NoteProvider";
// import { EditorProvider } from "./providers/EditorProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
