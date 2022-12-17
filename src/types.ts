export declare type Note = {
    id: string | number;
    category?: string | number
    title: string;
    text: string;
    favourite: boolean;
    createdAt: string;
    deletedAt?: string
}

export declare type Category = {
    id: string | number;
    name: string;
}