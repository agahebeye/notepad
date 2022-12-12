export declare type Note = {
    id: string | number;
    title: string;
    description: string;
    text: string;
    favourite: boolean;
    createdAt: string;
}

export declare type SetOpen = (state: React.SetStateAction<boolean>) => void;