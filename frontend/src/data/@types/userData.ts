

export interface userData {
    name: string,
    passwd: string
    id_user: number,
	at_date?: Date
    // Criar um valor do tipo Blob/Arquivo img
}

export interface messageInterface {
    id_messages: number,
    message: string,
    from_user: number,
    to_user: number, 
    at_date: Date
}