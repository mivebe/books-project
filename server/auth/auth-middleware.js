import passport from 'passport';

const authMiddleware = passport.authenticate('jwt', { session: false });
const authMiddlewareRefresh = passport.authenticate('refresh', { session: false });
/**
 * @param {string} roleName The corect roll to check
 * @returns {Function} callback that check the role
 */
const roleMiddleware = (roleName) => {
    return (req, res, next) => {
        if (req.user && req.user.role === roleName) {
            next();
        } else {
            next('Resource is forbidden.');
        }
    };
};

/**
 * @param {any} libraryData The dataBase
 * @returns {Function} callback that check if user is banned
 */
const bannedMiddleware = (libraryData) => {
    return async (req, res, next) => {
        const userId = req.user.id;
        const user = await libraryData.getOneFrom('id', userId, 'users');

        if (!user.isBanned) {
            next();
        } else {
            const banReason = await libraryData.getWithBanReason(userId);
            next('User is banned. Reason: ' + banReason.ban_reason);
        }
    };
};
/**
 * Middleware thаt catch errors and send corect status code
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
