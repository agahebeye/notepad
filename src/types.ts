export declare type Note = {
    id: string | number;
    categoryId?: string | number
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