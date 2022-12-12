import React, { useContext } from "react";
// import { useEditor } from "~/providers/EditorProvider";
type NoteListProps = {
  setOpen: (state: React.SetStateAction<boolean>) => void;
};

export function NoteList(props: NoteListProps) {
  //  const { setOpen } = useEditor();

  return (
    <div className="noteList">
      <div className="note">
        <h3 className="note--tile">
          <a href="#" onClick={(event) => openInEditor(event)}>
            Memories
          </a>
        </h3>
        <div className="note--description">Lorem, ipsum dolor.</div>
        <div className="note--date">December 10</div>
      </div>

      <div className="note">
        <h3 className="note--tile">Memories</h3>
        <div className="note--description">Lorem, ipsum dolor.</div>
        <div className="note--date">December 10</div>
      </div>

      <div className="note">
        <h3 className="note--tile">Memories</h3>
        <div className="note--description">Lorem, ipsum dolor.</div>
        <div className="note--date">December 10</div>
      </div>
    </div>
  );

  function openInEditor(event: React.MouseEvent) {
    event.preventDefault();
    console.log("open in editor");
    props.setOpen(true);
  }
}
