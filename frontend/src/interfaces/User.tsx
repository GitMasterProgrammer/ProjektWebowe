export interface User {
    id: number,
    createdAt: Date,
    email: string,
    name: string,
    password?: string,
    reliability: number
}