import Usuario from '../models/usuario';
const existeUsuario = async (username='') => {
    const existe = await Usuario.findOne({ where: { nombre: username }});
    
    if(existe){
        throw new Error(`Este nombre: ${username} ya esta en uso, escribe otro para iniciar el juego`);
    }

};

export default existeUsuario;