

export interface userData {
    name: string,
    passwd: string
    id_user: number,
	at_date?: Date
    // Criar um valor do tipo Blob/Arquivo img
}

export interface userPictureInterface extends userData{
    id_picture: number;
    id_user: number;
    picture_name: string;
    url_img: string,
    picture_description: string;
    picture_created_at: Date
}

export interface messageInterface {
    id_messages: number,
    message: string,
    from_user: number,
    to_user: number, 
    at_date: Date
}