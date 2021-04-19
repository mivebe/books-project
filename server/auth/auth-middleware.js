import passport from 'passport';

const authMiddleware = passport.authenticate('jwt', { session: false });
const authMiddlewareRefresh = passport.authenticate('refresh', { session: false });
/**
 * @param {string} roleName The corect roll to check
 * @returns {Function} callback that check the role
 */
const roleMiddleware = (roleName = "admin") => {
    return (req, res, next) => {
        if (req.user && req.user.role === roleName) {
            next();
        } else {
            next('Resource is forbidden. You are not an Admin!');
        }
    };
};

/**
 * @param {any} SQLRequests The dataBase
 * @returns {Function} callback that check if user is banned
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
 * Middleware thаt catches errors and send correct status code
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