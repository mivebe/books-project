import express from "express"
import { authMiddleware, authMiddlewareRefresh, roleMiddleware } from '../auth/auth-middleware.js';
import { createToken, createRefreshToken } from '../auth/create-token.js';
import booksData from '../data/books-data.js';
import usersService from '../services/users-services.js';
import { createValidator, createUserSchema } from "../validations/schemeNozzle.js";
// loginUserSchema, queryValidator, limitOffsetSchema

const returnBothTokens = async (err, user, res) => {
    if (err) {
        return res.status(400).send({ msg: err })
    } else {
        const refreshPayload = { sub: user.id, username: user.username };
        const payload = {
            sub: user.id,
            username: user.username,
            role: user.isTeacher ? 'moderator' : "user",
            firstName: user.first_name,
            lastName: user.last_name
        }
        const refreshToken = createRefreshToken(refreshPayload);
        const token = createToken(payload);
        await usersService.saveRefreshToken(booksData)(refreshToken, user.id);
        return res.status(200).send({ refreshToken, token })
    }
}
const usersController = express.Router();

usersController
    .post("/register", createValidator(createUserSchema), async (req, res) => {
        const { firstName, lastName, username, email, password } = req.body;
        const { err, user } = await usersService.createUser(booksData)(
            firstName,
            lastName,
            username,
            email,
            password,
        );
        // returnBothTokens(err, user, res)
        if (err) {
            console.log(err);
            res.status(400).send("sha ma praish na putka")
        } else {
            res.status(200).send("brao brat")
        }
    })

export default usersController