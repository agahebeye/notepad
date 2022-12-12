export function Application() {
  /* - Categories
            - list of note
        - search notes box
        - list of notes
        - create note
        - note editor
    */
  return (
    <div className="app">
      <h1 className="category-title">All notes</h1>
      <div className="note-count">3 notes</div>
      <input className="input-search" type="text" />
      <br />
      <br />
      <button>create note</button>
      <div className="note-list">
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

        <div className="note">
          <h3 className="note--tile">Memories</h3>
          <div className="note--description">Lorem, ipsum dolor.</div>
          <div className="note--date">December 10</div>
        </div>
      </div>
    </div>
  );
}
