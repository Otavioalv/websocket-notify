import { JwtPayload } from "jsonwebtoken"

export interface userInterface {
    id_user: number,
	name: string,
	passwd?: string,
	at_date: Date
}

export interface payloadTokenInterface extends JwtPayload{
    id: number,
    name: string
}