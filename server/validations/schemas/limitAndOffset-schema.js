import { queryErrors } from '../../errors/errors.js';

export const limitAndOffsetSchema = {
    limit: value => {

        if (value && (!Number.isInteger(+value) || +value <= 0)) {
            return queryErrors.INVALID_LIMIT;
        }

        return null;
    },
    offset: value => {
        if (value && (!Number.isInteger(+value) || +value < 0)) {
            return queryErrors.INVALID_OFFSET;
        }

        return null;
    },
};