import type { Note } from "./types"

type ActionType =
    | { type: 'openEditor'; payload: boolean }
    | { type: 'closeEditor'; payload: boolean }

export const initialState = {
    editorOpen: false,
    currentNoteId: 0,
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

        default:
            throw new Error('unknown action');
    }
}