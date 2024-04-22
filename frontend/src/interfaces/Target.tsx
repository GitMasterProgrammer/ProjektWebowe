import {User} from "./User.tsx";

export interface Target {
    id: number
    name: string;
    description: string;
    likes: number
    creator: User
}