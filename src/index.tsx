import React from "react";
import ReactDOM from "react-dom/client";
import { Application } from "./Application";
import { NoteProvider } from "./NoteProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NoteProvider>
      <Application />
    </NoteProvider>
  </React.StrictMode>
);
