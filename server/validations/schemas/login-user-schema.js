import { userErrors } from '../../errors/errors.js';
export const loginUserSchema = {
    username: value => {
        if (!value) {
            return userErrors.USERNAME_REQUIRED;
        }

        if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
            return userErrors.USERNAME_LENGTH_CHECK;
        }

        return null;
    },
    password: value => {
        if (!value) {
            return userErrors.PASSWORD_REQUIRED;
        }

        if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
            return userErrors.PASSWORD_LENGTH_CHECK;
        }

        return null;
    }
};