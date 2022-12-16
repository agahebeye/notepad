import React from "react";
import { ArrowLeftIcon, CheckIcon, PlusIcon } from "@heroicons/react/24/solid";

import { CategoryList } from "~/components/CategoryList";
import { NewCategoryDialog } from "~/components/NewCategoryDialog";
import { initialState } from "~/reducer";
import type { ActionType } from "~/reducer";
import { nanoid } from "nanoid";

type EditorProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
};

type EditorInput = HTMLInputElement | HTMLTextAreaElement;

export function Editor(props: EditorProps) {
  let [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const [note, setNote] = React.useState({
    title: "",
    description: "",
    text: "",
    category: "No category",
    favourite: false,
  });

  const currentNote = props.state.notes.find(
    (note) => note.id === props.state.currentNoteId
  );

  const textRef = React.useRef<HTMLTextAreaElement | null>(null);

  React.useEffect(() => {
    textRef.current?.focus();
  }, []);

  console.log("editor rendered");

  return (
    <div className="max-w-[600px] w-full px-8">
      {currentNote && (
        <div className="text-sm text-blue-500">
          Note: Updates are being carried out live and synchroniously. When you
          have finished hit <span className="bg-gray-200 p-0.5 font-bold">back button</span> and the current note will reflect the
          change done so far.
        </div>
      )}
      <button
        onClick={() => props.dispatch({ type: "closeEditor", payload: false })}
        className="flex mt-8 space-x-2 items-center text-sm text-gray-700"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>back</span>
      </button>

      <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="input text-sm py-3"
          onChange={handleChange}
          value={currentNote?.title ?? note.title}
          name="title"
          placeholder="Title"
        />

        <div className="mt-2 space-x-4 flex items-center">
          <CategoryList
            items={props.state.categories}
            value={(currentNote?.category as string) ?? note.category}
            onChange={(value: string) => handleChange(value)}
          />

          <button
            onClick={() => setIsDialogOpen(true)}
            className="text-[10px] underline text-blue-400 uppercase font-semibold tracking-wide"
          >
            add new category
          </button>

          <NewCategoryDialog isOpen={isDialogOpen} close={addNewCategory} />
        </div>

        <div className="mt-3 flex items-center space-x-2 text-sm text-gray-700">
          <input
            id="favourite"
            type="checkbox"
            name="favourite"
            onChange={handleChange}
            className="focus:ring-0 hover:bg-blue-400  checked:bg-blue-400 border-blue-400 rounded-full"
            checked={currentNote?.favourite ?? note.favourite}
          />
          <label htmlFor="favourite">Favourite?</label>
        </div>

        <textarea
          name="text"
          value={currentNote?.text ?? note.text}
          onChange={handleChange}
          ref={textRef}
          className="input mt-6 resize-none min-h-[200px] text-sm p-4"
        />

        {note.title.length > 5 && (
          <button
            onClick={addNote}
            className="button space-x-1 mt-4 table m-auto"
          >
            <span>Finish</span>
            <CheckIcon className="w-4 h-4 inline" />
          </button>
        )}
      </form>
    </div>
  );

  function handleChange(event: React.ChangeEvent<EditorInput> | string) {
    let name = "",
      value = "" as string | boolean;

    if (typeof event === "string") {
      name = "category";
      value = event;
    } else {
      name = event.currentTarget.name;
      value =
        event.target.type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : event.target.value;
    }

    if (currentNote) {
      const newNotes = props.state.notes.map((note) => {
        return note.id === currentNote?.id ? { ...note, [name]: value } : note;
      });

      props.dispatch({ type: "setNotes", payload: newNotes });
    } else {
      setNote((prevNote) => ({ ...prevNote, [name]: value }));
    }
  }

  function addNote() {
    const newNote = {
      ...note,
      id: nanoid(),
      createdAt: new Date().toDateString(),
    };

    props.dispatch({ type: "addNote", payload: newNote });
    props.dispatch({ type: "openEditor", payload: false });
  }

  function addNewCategory(name: string) {
    if (name.length > 0) {
      props.dispatch({
        type: "addCategory",
        payload: {
          id: nanoid(),
          name,
        },
      });
    }

    setIsDialogOpen(false);
  }
}
