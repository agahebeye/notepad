import type { Note } from "./types"

export type ActionType =
    | { type: 'openEditor'; payload: boolean }
    | { type: 'closeEditor'; payload: boolean }
    | { type: 'addNote'; payload: Note }
    | { type: 'setNotes'; payload: Note[] }
    | { type: 'searchNotes'; payload: string }
    | { type: 'setCurrentNoteId'; payload: string | number }

export const initialState = {
    editorOpen: false,
    currentNoteId: 0 as string | number,
    notes: [] as Note[]
}

export function reducer(state: typeof initialState, action: ActionType) {
    switch (action.type) {
        case "openEditor":
        case "closeEditor":
            return {
                ...state,
                editorOpen: action.payload
            }

        case "addNote":
            return {
                ...state,
                currentNoteId: action.payload.id,
                notes: [action.payload, ...state.notes]
            }

        case "setNotes":
            return {
                ...state,
                notes: action.payload
            }

        case "searchNotes":
            const regex = new RegExp(`^${action.payload}`, 'gi')

            const notes = state.notes.filter(note => {
                return regex.test(note.title)
            })

            // console.log(notes)

            return {
                ...state,
                notes
            }

        case "setCurrentNoteId":
            return {
                ...state,
                currentNoteId: action.payload
            }

        default:
            throw new Error('unknown action');
    }
}