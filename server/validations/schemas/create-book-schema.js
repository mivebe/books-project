import { bookErrors } from '../../errors/errors.js';

export const createBookSchema = {
    title: value => {
        if (!value) {
            return bookErrors.TITLE_IS_REQUIRED;
        }

        if (typeof value !== 'string' || value.trim().length < 1 || value.trim().length > 45) {
            return bookErrors.TITLE_MUST_BE_A_VALID_STRING;
        }

        return null;
    },
    author: value => {
        if (!value) {
            return bookErrors.AUTHOR_IS_REQUIRED;
        }

        if (typeof value !== 'string' || value.trim().length < 1 || value.trim().length > 45) {
            return bookErrors.AUTHOR_MUST_BE_A_VALID_STRING;
        }

        return null;
    },
    genre: value => {
        if (!value) {
            return bookErrors.GENRE_MUST_BE_A_VALID_STRING;
        }

        if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 45) {
            return bookErrors.GENRE_IS_REQUIRED;
        }

        return null;
    },
    description: value => {
        if (!value) {
            return bookErrors.DESCRIPTION_IS_REQUIRED
        }
        if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 500) {
            return bookErrors.DESCRIPTION_MUST_BE_A_VALID_STRING
        }
        return null
    },
    publishdate: value => {
        if (!value) {
            return bookErrors.PUBLISHDATE_IS_REQUIRED;
        }

        if (typeof +value !== 'number' || isNaN(+value) || +value < 0 || value.length < 4) {
            return bookErrors.PUBLISHDATE_MUST_BE_A_VALID_YEAR;
        }

        return null;
    },
    copies: value => {
        if (!value) {
            return bookErrors.COPIES_IS_REQUIRED;
        }

        if (typeof +value !== 'number' || isNaN(+value) || +value < 0) {
            return bookErrors.COPIES_MUST_BE_A_VALID_NUMBER;
        }

        return null;
    },


};