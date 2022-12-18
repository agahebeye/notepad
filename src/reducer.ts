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
    | { type: 'deleteNote'; payload: Note }
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
            const notes = action.payload.deletedAt
                ? state.notes.filter(note => note.id !== action.payload.id)
                : state.notes.map((note) => {
                    return note.id === action.payload.id
                        ? { ...note, deletedAt: new Date().toDateString() }
                        : note
                })
            return {
                ...state,
                notes
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