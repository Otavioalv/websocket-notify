"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const pg_1 = require("pg");
const connection = new pg_1.Pool({
    user: config_1.configDb.user,
    password: config_1.configDb.pswd,
    host: config_1.configDb.host,
    port: parseInt(config_1.configDb.port),
    database: config_1.configDb.database
});
connection.connect((err, client) => {
    if (err) {
        throw new Error(`Erro connecting to database`);
    }
    else {
        console.log(`Connected to database`);
    }
});
exports.default = connection;
