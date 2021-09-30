import passportJwt from 'passport-jwt';
import { PRIVATE_KEY, REFRESH_PRIVATE_KEY } from '../config.js';

const options = {
    secretOrKey: PRIVATE_KEY,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const refreshOptions = {
    secretOrKey: REFRESH_PRIVATE_KEY,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new passportJwt.Strategy(options, async (payload, done) => {
    const userData = {
        id: payload.id,
        username: payload.username,
        role: payload.role,
    };

    // userData will be set as `req.user` in the `next` middleware
    done(null, userData);
});

const refreshJwtStrategy = new passportJwt.Strategy(refreshOptions, async (payload, done) => {
    const userData = {
        id: payload.sub,
        username: payload.username,
    };

    // userData will be set as `req.user` in the `next` middleware
    done(null, userData);
});

export { jwtStrategy, refreshJwtStrategy };
