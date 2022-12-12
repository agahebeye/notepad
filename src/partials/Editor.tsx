// import { useEditor } from "~/providers/EditorProvider";
type EditorProps = {
  setOpen: (state: React.SetStateAction<boolean>) => void;
};

export function Editor(props: EditorProps) {
  // const { setOpen } = useEditor();

  return (
    <div className="editor">
      <button
        onClick={(event) => {
          props.setOpen(false);
        }}
      >
        close
      </button>
      <h1>editor</h1>
    </div>
  );
}
