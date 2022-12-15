import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import { CategoryList } from "~/components/CategoryList";
import { initialState } from "~/reducer";
import type { ActionType } from "~/reducer";
import { Category } from "~/types";

type EditorProps = {
  state: typeof initialState;
  dispatch: React.Dispatch<ActionType>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

type EditorInput = HTMLInputElement | HTMLTextAreaElement;

export function Editor(props: EditorProps) {
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
      <div>
        <button>
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>

      <form>
        <input
          type="text"
          className="w-full"
          onChange={handleChange}
          value={currentNote?.title}
          placeholder="Title"
        />

        <div className="mt-2 space-x-4 flex items-center">
          <CategoryList
            items={props.categories}
            value={currentNote?.category as string}
            onChange={setNoteCategory}
          />

          <button className="text-[10px] underline text-blue-400 uppercase font-semibold tracking-wide">
            add new category
          </button>
        </div>

        <textarea
          name="text"
          value={currentNote?.text}
          onChange={handleChange}
          ref={textRef}
          className="w-full mt-6 resize-none min-h-[200px]"
        />
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

    const newNotes = props.state.notes.map((note) => {
      return note.id === currentNote?.id ? { ...note, [name]: value } : note;
    });

    props.dispatch({ type: "setNotes", payload: newNotes });
  }

  function setNoteCategory(category: string | number) {
    const newNotes = props.state.notes.map((note) => {
      return note.id === currentNote?.id
        ? { ...note, category: category }
        : note;
    });

    props.dispatch({ type: "setNotes", payload: newNotes });
  }
}
