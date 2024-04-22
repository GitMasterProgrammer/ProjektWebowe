export interface User {
    id: number,
    createdAt: string,
    email: string,
    name: string,
    password?: string,
    reliability: number
}