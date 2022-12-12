import React from "react";

type NoteProviderPropsType = {
  children: React.ReactNode;
};

type Note = {
  id: string;
  title: string;
  description: string;
  text: string;
  favourite: boolean;
  createdAt: string;
};

export const NoteContext = React.createContext({
  editorOpened: false,
  setEditorOpened: (cb: React.SetStateAction<boolean>) => {},
});

export function NoteProvider(props: NoteProviderPropsType) {
  const [editorOpened, setEditorOpened] = React.useState(false);

  return (
    <NoteContext.Provider value={{ editorOpened, setEditorOpened }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export function useNotes() {
  return React.useContext(NoteContext);
}
