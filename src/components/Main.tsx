import { NoteList } from "./NoteList";

export function Main() {
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