import { idErrors } from '../errors/errors.js';

export const createValidator = (schema) => {
    return (req, res, next) => {
        const body = req.body;
        const validations = Object.keys(schema);

        const fails = validations
            .map((v) => schema[v](body[v]))
            .filter((e) => e !== null);

        if (fails.length > 0) {
            res.status(400).send(fails);
        } else {
            next();
        }
    };
};
export const queryValidator = (schema) => {
    return (req, res, next) => {
        const query = req.query;
        const validations = Object.keys(schema);

        const fails = validations
            .map((v) => schema[v](query[v]))
            .filter((e) => e !== null);

        if (fails.length > 0) {
            res.status(400).send(fails);
        } else {
            next();
        }
    };
};
export const checkId = (res, id) => {
    if (Number.isNaN(+id)) {
        return res.status(400).send({
            msg: idErrors.ID_TYPE_MUST_BE_NUMBER,
        });
    }
};
