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
      <button
        onClick={() => props.dispatch({ type: "closeEditor", payload: false })}
        className="flex space-x-2 items-center text-sm text-gray-700"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        <span>back</span>
      </button>

      <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="input text-sm py-3"
          onChange={handleChange}
          value={note.title}
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

        <textarea
          name="text"
          value={note.text}
          onChange={handleChange}
          ref={textRef}
          className="mt-6 resize-none bg-gray-100 min-h-[200px] w-full focus:ring-0 border-0 shadow-md rounded-lg"
        />

        <button
          onClick={addNote}
          className="button space-x-1 mt-4 table m-auto"
        >
          <span>Finish</span>
          <CheckIcon className="w-4 h-4 inline" />
        </button>
      </form>
    </div>
  );

  function handleChange(event: React.ChangeEvent<EditorInput> | string) {
    let name = "",
      value = "";

    if (typeof event === "string") {
      name = "category";
      value = event;
    } else {
      name = event?.target?.name;
      value = event?.target?.value;
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
    if (note.title.trim().length > 0) {
      const newNote = {
        ...note,
        id: nanoid(),
        createdAt: new Date().toDateString(),
        favourite: false,
      };

      console.log(newNote);
      props.dispatch({ type: "addNote", payload: newNote });
      props.dispatch({ type: "openEditor", payload: false });
    } else {
      throw new Error("Title is required.");
    }
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
