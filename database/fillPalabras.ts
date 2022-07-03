import Diccionario from '../models/diccionario';
import Palabra from '../models/palabra';

export const FillPalabras = async () => {
    const fills = await Palabra.findAll();

    if(fills.length > 0){
        return;
    }

    const diccionario = await Diccionario.findAll();


    let nuevasPalabras:any = diccionario.filter((item:any) => item.dataValues.palabra.length == 5);

    for (let x = 0; x < nuevasPalabras.length; x++) {
        let dato:any = await new Palabra();
        dato.id = x+1;
        dato.palabra = nuevasPalabras[x].dataValues.palabra;
        dato.acertada = 0;
        dato.mostrada = false;
        dato.save();
    }

    return console.log('Diccionario de palabras creado correctamente');
};