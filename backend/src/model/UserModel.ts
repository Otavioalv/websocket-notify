import connection from "@/database/connectionPostgres";
import { basicMessageInterface, messageInterface, payloadTokenInterface, userInterface } from "@/interfaces/userInterface";
import { PoolClient } from "pg";

class UserModel{
    public async createUser(data: userInterface): Promise<void>{
        let client: PoolClient | undefined;
        try {
            client = await connection.connect();
			
            const SQL = `INSERT INTO user_notify(name, passwd) values ($1, $2)`;

            const {name, passwd} = data;
            const values:any[] = [name, passwd];

            await client.query('BEGIN');
            await client.query(SQL, values);
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

    public async listUsers(payload: payloadTokenInterface):Promise<userInterface[]> {
        let client:PoolClient | undefined;
        try {
            client = await connection.connect();
            const SQL = `SELECT trim(name) as name, id_user, at_date FROM user_notify WHERE id_user != $1`;
            
            await client.query('BEGIN');
            const result = (await client.query(SQL, [payload.id])).rows as userInterface[];
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
            console.log(from, to);
            
			client = await connection.connect();
            const SQL:string = "SELECT id_messages, message, from_user, to_user, at_date from messages WHERE (from_user = $1 and to_user = $2) or (from_user = $3 and to_user = $4)";

            await client.query('BEGIN');
            const result = (await client.query(SQL, [from, to, to, from])).rows as messageInterface[];
            await client.query('COMMIT');
            
            client.release();

            console.log(result);

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

    public async uploadPicture(image: Express.Multer.File, id_user: number, description: string): Promise<void> {
        let client:PoolClient | undefined
        try {
            client = await connection.connect();

            // id_user e chave unica, se de conflito, ele faz o proximo comando que e o update dele
            const {originalname, mimetype, buffer} = image;
            const SQL:string = `
                INSERT INTO pictures (name, type, data, description, id_user) 
                VALUES ($1, $2, $3, $4, $5)
                ON CONFLICT (id_user)
                DO UPDATE SET
                    name = EXCLUDED.name,
                    type = EXCLUDED.type,
                    data = EXCLUDED.data,
                    description = EXCLUDED.description,
                    created_at = CURRENT_TIMESTAMP
                ;`;

            await client.query("BEGIN");
            await client.query(SQL, [originalname, mimetype, buffer, description, id_user]);
            await client.query("COMMIT");

            client.release();

            return;
        } catch (err) {
            console.log(err);
            client?.release();
            throw new Error("Erro ao salvar imagem no banco de dados");
        }
    }
}

export {UserModel}