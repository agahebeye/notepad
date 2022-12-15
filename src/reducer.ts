import type { Category, Note } from "./types"
import { categories } from "./data";

export type ActionType =
    | { type: 'openEditor'; payload: boolean }
    | { type: 'closeEditor'; payload: boolean }
    | { type: 'addNote'; payload: Note }
    | { type: 'setNotes'; payload: Note[] }
    | { type: 'setCurrentNoteId'; payload: string | number | undefined}
    | { type: 'addCategory'; payload: Category }


export const initialState = {
    editorOpen: false,
    currentNoteId: 0/*  as string | number | undefined */,
    notes: [] as Note[],
    categories: categories as Category[]
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
                notes: [action.payload, ...state.notes]
            }

        case "setNotes":
            return {
                ...state,
                notes: action.payload
            }

        case "setCurrentNoteId":
            return {
                ...state,
                currentNoteId: action.payload
            }

        case "addCategory":
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }

        default:
            console.error(`Unhandled action type`);
            return state;
    }
}