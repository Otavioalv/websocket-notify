require('dotenv').config();
interface authJwtInterface {
    secret: string
}

export const authJwt:authJwtInterface = {
    secret: String(process.env.JWT_SECRET)
}