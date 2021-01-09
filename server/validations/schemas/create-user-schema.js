import { userErrors } from '../../errors/errors.js';
export const createUserSchema = {
    firstName: value => {
        if (!value) {
            return userErrors.FIRST_NAME_REQUIRED;
        }

        if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
            return userErrors.FIRST_NAME_LENGTH_CHECK;
        }

        return null;
    },
    lastName: value => {
        if (!value) {
            return userErrors.LAST_NAME_REQUIRED;
        }

        if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
            return userErrors.LAST_NAME_LENGTH_CHECK;
        }

        return null;
    },
    username: value => {
        if (!value) {
            return userErrors.USERNAME_REQUIRED;
        }

        if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
            return userErrors.USERNAME_LENGTH_CHECK;
        }

        return null;
    },
    email: value => {
        if (value) {
            return null
        }
    },
    password: value => {
        if (!value) {
            return userErrors.PASSWORD_REQUIRED;
        }

        if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
            return userErrors.PASSWORD_LENGTH_CHECK;
        }

        return null;
    },


};