import jwt from 'jsonwebtoken';
import { REFRESH_PRIVATE_KEY, REFRESH_TOKEN_LIFETIME, PRIVATE_KEY, TOKEN_LIFETIME } from './../config.js';
/**Creates jwt and takes payload as param*/

export const createToken = (payload) => {

    const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: TOKEN_LIFETIME });

    return token;
};

export const createRefreshToken = (payload) => {

    const token = jwt.sign(payload, REFRESH_PRIVATE_KEY, { expiresIn: REFRESH_TOKEN_LIFETIME });

    return token;
};