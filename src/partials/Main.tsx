import { NoteList } from "~/components/NoteList";

type MainPropsType = {
  openEditor: () => void;
};

export function Main(props: MainPropsType) {
  return (
    <main>
      <h1 className="category-title">All notes</h1>
      <div className="note-count">3 notes</div>
      <input
        className="input-search"
        placeholder="Search notes..."
        type="text"
      />
      <br />
      <br />
      <button>create note</button>

      <NoteList />
    </main>
  );
}
