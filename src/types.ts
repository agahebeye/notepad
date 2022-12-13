export declare type Note = {
    id: string | number;
    category?: string | number
    title: string;
    description: string;
    text: string;
    favourite: boolean;
    createdAt: string;
}

export declare type Category = {
    id: string | number;
    name: string;
}