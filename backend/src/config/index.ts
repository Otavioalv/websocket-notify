require('dotenv').config();

interface authJwtInterface {
    secret: string
}

interface configCookieInterface {
    cookieNameToken: string
}

interface configAPIInterface {
    localHost:string;
    publicHost:string;
    serverHost:string;
    port:string;
    validAddress:string[]
}

interface configDbInterface {
    port:string;
    host:string;
    pswd:string;
    user:string;
    database:string;
}

// Configuração de autenticação JWT
export const authJwt:authJwtInterface = {
    secret: String(process.env.JWT_SECRET)
}


// Configuração da API
export const configAPI:configAPIInterface =  {
    localHost: String(process.env.LOCAL_HOST),
    publicHost: String(process.env.PUBLIC_HOST),
    serverHost: String(process.env.SERVER_HOST),
    port: String(process.env.PORT),
    validAddress: String(process.env.VALID_ADDRESS).replace(/ /g, "").split(","),
}

// Configuração do banco de dados
export const configDb:configDbInterface = {
    port: String(process.env.PSQL_PORT),
    host: String(process.env.PSQL_HOST),
    pswd: String(process.env.PSQL_PSWD),
    user: String(process.env.PSQL_USER),
    database: String(process.env.PSQL_DB)
}

// Configuração dos Cookies
export const configCookie:configCookieInterface = {
    cookieNameToken: String(process.env.COOKIE_NAME_TOKEN)
}