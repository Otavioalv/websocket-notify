import connection from "@/database/connectionPostgres";
import { payloadTokenInterface, userInterface } from "@/interfaces/userInterface";
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
            throw new Error("Erro interno no servidor");
        }
    }

    public async findUserByName(name: string): Promise<userInterface>{
        let client: PoolClient | undefined;
        try {
            client = await connection.connect();
            const SQL = `SELECT name, id_user, passwd, at_date FROM user_notify WHERE name = $1`;

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
            const SQL = `SELECT name, id_user, at_date FROM user_notify WHERE id_user != $1`;
            
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
}

export {UserModel}