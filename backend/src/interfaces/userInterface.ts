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

export interface basicMessageInterface {
	message: string,
    from_user: number,
    to_user: number, 
    at_date: Date
}

export interface messageInterface extends basicMessageInterface{
    id_messages: number
}