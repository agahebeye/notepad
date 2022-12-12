import React from "react";

export const EditorContext = React.createContext({
  open: false,
  setOpen: (cb: React.SetStateAction<boolean>) => {},
});

export function EditorProvider(props: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <EditorContext.Provider value={{ open, setOpen }}>
      {props.children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  return React.useContext(EditorContext);
}
