import jwt  from "jsonwebtoken";
import { Response } from "express";
import Usuario from '../models/usuario';

const validaJWT = async (req:any, res:Response, next:any) => {
    const token = req.header('Token-Prueba');
    if(!token){
        return res.status(500).json({
            msg: 'El token no es valido'
        });
    }
    try{
        const dataToken:any = jwt.verify(token, process.env.SECRET_KEY || 'Token_prueba');

        const usuario = await Usuario.findOne({
            where: {
                nombre: dataToken.username
            }
        });

        if(!usuario){
            return res.status(400).json({
                msg: 'El token es invalido'
            });
        }

        req.usuario = usuario;

        return next();
    }
    catch(err){
        return res.status(400).json({
            msg: 'El token no es valido'
        });
    }
};

export default validaJWT;