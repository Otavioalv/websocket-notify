import { Request, Response, NextFunction } from "express";

function authenticatedRouter (req: Request, res: Response, next: NextFunction) {
    try {
        if(false) {
            res.status(403).send({message: "Rota inacessivel"});
            console.log("Rota inavessivel");
    
            return;
        }
        
        console.log("teste autenticação");
        return next();   
    } catch (e) {
        res.status(401).send({message: "Voce não tem autorização para acessar esse conteudo"});
    }
}   

export {authenticatedRouter}