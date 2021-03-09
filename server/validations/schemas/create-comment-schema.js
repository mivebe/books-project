import { bookErrors, commentErrors } from '../../errors/errors.js';

export const createCommentSchema = {
    comment: value => {
        if (!value) {
            return commentErrors.COMMENT_IS_REQUIRED;
        }

        if (typeof value !== 'string' || value.trim().length < 3 || value.trim().length > 200) {
            return commentErrors.COMMENT_CONSTRAINTS;
        }

        return null;
    },

};