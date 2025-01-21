require('dotenv').config();

interface authJwtInterface {
    secret: string
}

interface configAPIInterface {
    port:number;
    address:string;
    freeAddress:string;
    addCmplt:string 
    freeAddCmplt:string;
}

export const authJwt:authJwtInterface = {
    secret: String(process.env.JWT_SECRET)
}

export const configAPI:configAPIInterface =  {
    port: parseInt(process.env.PORT_API ?? ""),
    address: String(process.env.ADDRESS_API),
    freeAddress: String(process.env.FREE_ADDRESS_API),
    addCmplt: `http://${String(process.env.ADDRESS_API)}:${process.env.PORT_API}`,
    freeAddCmplt: `http://${String(process.env.FREE_ADDRESS_API)}:${process.env.PORT_API}`,
}