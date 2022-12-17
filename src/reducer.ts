import type { Category, Note } from "./types"
import { categories } from "./data";

export type initialStateType = {
    editorOpen: boolean,
    currentNoteId: string | number | undefined,
    notes: Note[],
    categories: Category[]
}

export type ActionType =
    | { type: 'openEditor'; payload: boolean }
    | { type: 'closeEditor'; payload: boolean }
    | { type: 'addNote'; payload: Note }
    | { type: 'setNotes'; payload: Note[] }
    | { type: 'deleteNote'; payload: string }
    | { type: 'forceDeleteNote'; payload: string }
    | { type: 'setCurrentNoteId'; payload: string | number | undefined }
    | { type: 'addCategory'; payload: Category }


export const initialState = (JSON.parse(localStorage.getItem('app-store')!) ?? {
    editorOpen: false,
    currentNoteId: 0,
    notes: [],
    categories: categories
}) as initialStateType

export function reducer(state: initialStateType, action: ActionType) {
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

        case "deleteNote":
            return {
                ...state,
                notes: state.notes.map((note) => {
                    return note.id === action.payload
                        ? { ...note, deletedAt: new Date().toDateString() }
                        : note
                })
            }

        case "forceDeleteNote":
            return {
                ...state,
                notes: state.notes.filter((note) => note.deletedAt)
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
            throw new Error('Unkown action type')
    }
}