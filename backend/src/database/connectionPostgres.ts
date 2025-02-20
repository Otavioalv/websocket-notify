import { configDb } from '@/config';
import {Pool, PoolClient} from 'pg';


const connection = new Pool({   
    user: configDb.user,
    password: configDb.pswd,
    host: configDb.host,
    port: parseInt(configDb.port),
    database: configDb.database
});

connection.connect((err: Error | undefined, client: PoolClient | undefined) => {
    if(err) {
        throw new Error(`Erro connecting to database`);
    } else {
        console.log(`Connected to database`);
    }
});

export default connection;