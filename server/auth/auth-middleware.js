import passport from 'passport';

const authMiddleware = passport.authenticate('jwt', { session: false });
const authMiddlewareRefresh = passport.authenticate('refresh', { session: false });
/**
 * @param {string} roleName The correct role to be checked.
 * @returns {Function} Callback that checks user's role.
 */
const roleMiddleware = (roleName) => {
    return (req, res, next) => {
        if (req.user && req.user.role === roleName) {
            next();
        } else {
            next("restricted");
        }
    };
};

/**
 * @param {any} SQLRequests Database layer function/s.
 * @returns {Function} Callback function that checks if the user is banned.
 */
const bannedMiddleware = (SQLRequests) => {
    return async (req, res, next) => {
        const userId = req.user.id;
        const user = await SQLRequests.getOneFrom('id', userId, 'users');

        if (!user.isBanned) {
            next();
        } else {
            const banReason = await SQLRequests.getWithBanReason(userId);
            next('User is banned. Reason: ' + banReason.ban_reason);
        }
    };
};
/**
 * Middleware thаt catches errors and sends the correct status code.
 * 
 * @returns {string} The status code and error message.
 */
const errorMiddleware = (err, req, res, next) => {
    res.status(400).send({ msg: err });
};

export {
    authMiddleware,
    roleMiddleware,
    errorMiddleware,
    bannedMiddleware,
    authMiddlewareRefresh,
};