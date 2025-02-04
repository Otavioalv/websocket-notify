import connection from "@/database/connectionPostgres";
import { basicMessageInterface, messageInterface, payloadTokenInterface, pictureInterface, userInterface, userPictureInterface } from "@/interfaces/userInterface";
import { PoolClient } from "pg";

class UserModel{
    public async createUser(data: userInterface): Promise<void>{
        let client: PoolClient | undefined;
        try {
            client = await connection.connect();
			
            const SQL = `INSERT INTO user_notify(name, passwd) values ($1, $2)`;

            const {name, passwd} = data;

            await client.query('BEGIN');
            await client.query(SQL, [name, passwd]);
            await client.query('COMMIT');

            return;
        } catch (err) {
            client?.release();
            console.log(err);
            throw new Error("Erro interno no servidor");
        }
    }

    public async findUserByName(name: string): Promise<userInterface>{
        let client: PoolClient | undefined;
        try {
            client = await connection.connect();
            const SQL = `SELECT trim(name) as name, id_user, trim(passwd) as passwd, at_date FROM user_notify WHERE name = $1`;

            await client.query('BEGIN');
            const result: userInterface = (await client.query(SQL, [name])).rows[0] ?? {};
            await client.query('COMMIT');
            client.release();
			
            return result;
        } catch (err) { 
            client?.release();
            throw new Error("Erro interno no servidor")
        }
    }

    public async findUserById(id: number): Promise<userInterface[]>{
        let client: PoolClient | undefined;
        try {
            client = await connection.connect();
            const SQL: string = `
                SELECT 
                    trim(un.name) as name, 
                    un.id_user as id_user, 
                    un.at_date as at_date,
                    pi.name as picture_name,
                    pi.url_img as url_img,
                    pi.description as picture_description,
                    pi.created_at as picture_created_at
                FROM user_notify as un
                LEFT JOIN pictures as pi
                on un.id_user = pi.id_user
                WHERE un.id_user = $1;`;

            await client.query("BEGIN");
            const result: userInterface = ((await client.query(SQL, [id]))).rows[0] ?? {};
            await client.query("COMMIT");
            client.release();

            return [result]
        } catch (err) {
            client?.release();
            throw new Error("Erro interno no servidor");
        }

    }

    public async listUsers(payload: payloadTokenInterface):Promise<userPictureInterface[]> {
        let client:PoolClient | undefined;
        try {
            client = await connection.connect();

            const SQL = `
                SELECT 
                    trim(un.name) as name, 
                    un.id_user as id_user, 
                    un.at_date as at_date,
                    pi.name as picture_name,
                    pi.url_img as url_img,
                    pi.description as picture_description,
                    pi.created_at as picture_created_at
                FROM user_notify as un
                LEFT JOIN pictures as pi
                on un.id_user = pi.id_user
                WHERE un.id_user != $1;
            `;
            
            await client.query('BEGIN');
            const result = (await client.query(SQL, [payload.id])).rows as userPictureInterface[];
            await client.query('COMMIT');

            client.release();

            return result;
        } catch (error) {
            client?.release();
            throw new Error("Erro ao listar usuarios");
        }
    }

    public async listMenssages(from:number, to:number): Promise<messageInterface[]>{
        let client:PoolClient | undefined;
        try {
            
			client = await connection.connect();
            const SQL:string = "SELECT id_messages, message, from_user, to_user, at_date from messages WHERE (from_user = $1 and to_user = $2) or (from_user = $3 and to_user = $4)";

            await client.query('BEGIN');
            const result = (await client.query(SQL, [from, to, to, from])).rows as messageInterface[];
            await client.query('COMMIT');
            
            client.release();
            return result;
        } catch (error) {
            console.log(error);
            client?.release();
            throw new Error("Erro ao listar menssagens");
        }
    }

    public async saveMessage(messageData: basicMessageInterface):Promise<void>{
        let client:PoolClient | undefined;
        try {
            client = await connection.connect();
            
            console.log(messageData);
            const SQL:string = "INSERT INTO messages (message, from_user, to_user, at_date) VALUES ($1, $2, $3, $4);";
            
            await client.query("BEGIN");
            await client.query(SQL, [messageData.message, messageData.from_user, messageData.to_user, messageData.at_date]);
            await client.query("COMMIT");

            client.release(); // Teste

            return;
        } catch (error) {
            console.log(error);
            client?.release();
            throw new Error("Erro ao salvar menssagem");
        }
    }

    public async uploadPicture(image: pictureInterface): Promise<void> {
        let client:PoolClient | undefined
        try {
            client = await connection.connect();

            
            const {picture_name, url_img, picture_description, id_user} = image;
            
            // id_user e chave unica, se de conflito, ele faz o proximo comando que e o update
            const SQL:string = `
                INSERT INTO pictures (name, url_img, description, id_user) 
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (id_user)
                DO UPDATE SET
                    name = EXCLUDED.name,
                    url_img = EXCLUDED.url_img,
                    description = EXCLUDED.description,
                    created_at = CURRENT_TIMESTAMP
                ;`;
            
            await client.query("BEGIN");
            await client.query(SQL, [picture_name, url_img, picture_description, id_user]);
            await client.query("COMMIT");

            client.release();
            return;
        } catch (err) {
            console.log(err);
            client?.release();
            throw new Error("Erro ao salvar imagem no banco de dados");
        }
    }

    public async getPictureFromUser(id_user: number): Promise<pictureInterface[]> {
        let client: PoolClient | undefined;
        try {
            client = await connection.connect();

            const SQL: string = "SELECT id_picture, id_user, name, url_img, description, created_at FROM pictures WHERE id_user = $1;"

            await client.query("BEGIN")
            const result = (await client.query(SQL, [id_user])).rows as pictureInterface[] ;
            await client.query("COMMIT")

            client.release();
            return result;
        } catch (err) {
            client?.release();
            throw new Error("Erro ao verificar imagem");
            
        }

    }
}

export {UserModel}