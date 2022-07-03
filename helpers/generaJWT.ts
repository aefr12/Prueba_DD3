import jwt from 'jsonwebtoken';

const generateJWT = (username = '') => {
    return new Promise((resolve, reject) => {
        const payload = { username };

        jwt.sign(payload, process.env.SECRET_KEY || 'Token_prueba', {
            expiresIn: '1d'
        }, (err, token) => {
            if(err){
                reject('No se pudo generar el token');
            }
            else{
                resolve(token);
            }
        });
    });
}

export default generateJWT;