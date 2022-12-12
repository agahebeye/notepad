import {Main} from './components/Main';
import {Editor} from './components/Editor';

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
      <Main />
      <Editor />
    </div>
  );
}
