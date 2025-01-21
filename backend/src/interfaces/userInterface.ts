import { JwtPayload } from "jsonwebtoken"

export interface userInterface {
    id_user: number,
	name: string,
	passwd?: string,
	at_date: Date
}

export interface pictureInterface {
    id_picture: number;
    id_user: number;
    picture_name: string;
    url_img: string,
    picture_description: string;
    picture_created_at: Date
}

export interface userPictureInterface extends userInterface, pictureInterface{}

export interface basicMessageInterface {
    message: string,
    from_user: number,
    to_user: number, 
    at_date: Date
}

export interface payloadTokenInterface extends JwtPayload{
    id: number,
    name: string
}


export interface messageInterface extends basicMessageInterface{
    id_messages: number
}

