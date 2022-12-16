import { nanoid } from "nanoid"

export const categories = [
    {
        id: nanoid(),
        name: 'No category'
    }, {
        id: nanoid(),
        name: 'Travel'
    },
    {
        id: nanoid(),
        name: 'Personal'
    },
    {
        id: nanoid(),
        name: 'Work'
    },
    {
        id: nanoid(),
        name: 'Life'
    }
]

export const initialFilters = [
    {
        key: "all Notes",
        value: "All Notes",
    },
    {
        key: "favourite",
        value: "Favourite",
    },
    {
        key: "deleted",
        value: "Deleted",
    },
    {
        key: "category",
        value: "Categories",
    },
];