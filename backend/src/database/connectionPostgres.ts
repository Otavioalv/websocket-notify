import {Pool, PoolClient} from 'pg';

const USER:string = "postgres";
const PASSWD:string = "123456";
const PORT:number = 5432;
const HOST:string = "127.0.0.1";
const DB: string = "websocket_notify";

const connection = new Pool({   
    user: USER,
    password: PASSWD, 
    host: HOST, 
    port: PORT, 
    database: DB
});

connection.connect((err: Error | undefined, client: PoolClient | undefined) => {
    if(err) {
        throw new Error(`Erro connecting to database`);
    } else {
        console.log(`Connected to database`);
    }
});

export default connection;