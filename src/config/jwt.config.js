import  jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.js';

export const getToken = (payload) => {
    return jwt.sign({
        data: payload
    }, JWT_SECRET, { expiresIn: '1h' });
}

export const getTokenData = (token) => {
    let data = null;
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) {
            console.log('Error al obtener data del token');
        } else {
            data = decoded;
        }
    });

    return data;
}