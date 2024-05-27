import {Target} from "./Target.tsx";
import {User} from "./User.tsx";

export interface Location {
    id: number,
    actual: boolean,
    coordinates?: string,
    details?: string,
    address: string,
    rating: number,
    creator?: User
    target: Target,
    updatedAt: Date,
    createdAt: Date
}