import { Request, Response } from "express";

import cron from 'node-cron';

import Palabra from '../models/palabra';
import Actual from '../models/actual';
import Usuario from '../models/usuario';
import generateJWT from '../helpers/generaJWT';


cron.schedule('*/5 * * * *', () => {
    seleccionaPalabra();
},{
    scheduled: true,
    timezone: "America/Monterrey"
});


export const ObtienePalabra = async (req:Request, res:Response) => {

    const { username } = req.body;

    let palabra:any = await Actual.findAll();
    let usuario:any = new Usuario();

    usuario.nombre = username;
    usuario.intentos = 0;
    usuario.victorias = 0;

    usuario.save();

    const token = await generateJWT(username);

    return res.json({
        palabraEnturno: palabra[0].dataValues.actual,
        token,
        status: true
    });
};

export const ComparaPalabra = async (req:any, res:Response) => {

    const { palabra } = req.body;
    const actual:any = await Actual.findAll();
    let respuestas:any = [];

    if(palabra.toLowerCase() === actual[0].dataValues.actual){
        await Usuario.update({
            victorias: req.usuario.dataValues.victorias+1,
            intentos: 0
        },{
            where: {
                id: req.usuario.dataValues.id
            }
        });
        const acertada:any = await Palabra.findOne({where: {palabra: actual[0].dataValues.actual}});
        await Palabra.update({
            acertada: acertada.dataValues.acertada+1
        },{
            where: {
                id: acertada.dataValues.id
            }
        });

        return res.json({
            msg: `Palabra acertada: ${actual[0].dataValues.actual}`,
            status: true
        });
    }
    const palabraSeparada = palabra.toLowerCase().split('');
    const actualSeparada = actual[0].dataValues.actual.toLowerCase().split('');

    if(req.usuario.dataValues.intentos == 5){
        return res.json({
            msg: 'No acertaste la palabra',
            status: false
        });
    }

    for (let x = 0; x < palabraSeparada.length; x++) {
        if(palabraSeparada[x] == actualSeparada[x]){
            respuestas.push({
                letter: palabraSeparada[x],
                value: 1
            });
            await Usuario.update({
                intentos: req.usuario.dataValues.intentos+1
            },{
                where: {
                    id: req.usuario.dataValues.id
                }
            });
        }
        if(actual[0].dataValues.actual.toLowerCase().indexOf(palabraSeparada[x]) != -1){
            respuestas.push({
                letter: palabraSeparada[x],
                value: 2
            });
            await Usuario.update({
                intentos: req.usuario.dataValues.intentos+1
            },{
                where: {
                    id: req.usuario.dataValues.id
                }
            });
        }
    }
    // console.log(usuario);

    return res.json({
        answer: respuestas,
        status: true
    });
};

export const MuestraResultados = async (req:any, res:Response) => {

    const {username} = req.body;

    const partidas:any = await Usuario.findOne({where: { nombre: username }});

    return res.json({
        victorias: partidas[0].dataValues.victorias,
        usuario: partidas[0].dataValues.nombre,
        status: true
    });
};

export const MuestraMejores = async (req:any, res:Response) => {

    const listaMejores = await Usuario.findAll();

    listaMejores.sort(function(a:any,b:any){
        return b.dataValues.victorias - a.dataValues.victorias;
    });

    let mejores = listaMejores.splice(0,11);

    return res.json({
        mejores,
        status: true
    });
};

export const PalabrasAcertadas = async (req:any, res:Response) => {

    const masAcertadas:any = await Palabra.findAll();

    masAcertadas.sort(function(a:any,b:any){
        return b.dataValues.acertada - a.dataValues.acertada;
    });

    let lista = masAcertadas.splice(0,100);

    return res.json({
        masAcertadas: lista,
        status: true
    });
};

async function seleccionaPalabra(){
    console.log("Seleccionando Palabra");
    let palabraActual:any;
    try{
        let usuarios:any = await Usuario.findAll();
        for (let x = 0; x < usuarios.length; x++) {
            await Usuario.update({
                intentos: 0
            },{
                where: {
                    id: usuarios[x].dataValues.id
                }
            });
        }
        let listaPalabras:any = await Palabra.findAll({
            where: {
                mostrada: false
            }
        });
    
        let palabra = Math.floor(Math.random()*listaPalabras.length);
    
        await Palabra.update({
            mostrado: true
        },{
            where: {
                id: listaPalabras[palabra].dataValues.id,
            }
        });

        let existeActual:any = await Actual.findAll();

        if(existeActual.length > 0){
            await existeActual.update({
                palabra: listaPalabras[palabra].dataValues.palabra
            },{
                where: {
                    id: existeActual[0].dataValues.id
                }
            })
        }
        else{
            palabraActual = await new Actual();
            palabraActual.id = 1;
            palabraActual.actual = listaPalabras[palabra].dataValues.palabra;
        }
    
    
        palabraActual.save();


        console.log("Palabra Seleccionada");
        return true;
    }
    catch(err){
        return false;
    }
}




