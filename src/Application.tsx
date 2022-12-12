import React from "react";
import { Main } from "./partials/Main";
import { Editor } from "./partials/Editor";

export function Application() {
  const [open, setOpen] = React.useState(false);
  // React.useEffect(() => {}, []);

  return (
    <div className="app">
      {!open && <Main setOpen={setOpen} />}
      {open && <Editor setOpen={setOpen} />}
    </div>
  );
}
