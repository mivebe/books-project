import express from "express"
import { authMiddleware, authMiddlewareRefresh, roleMiddleware } from '../auth/auth-middleware.js';
import { createToken, createRefreshToken } from '../auth/create-token.js';
import SQLRequests from "../data/SQLRequests.js";
import usersService from '../services/users-services.js';
import { createValidator, createUserSchema, loginUserSchema } from "../validations/schemeNozzle.js";
// , queryValidator, limitOffsetSchema

const returnBothTokens = async (err, user, res) => {
    if (err) {
        return res.status(400).send({ msg: err, devMsg: "sha ma praish na putka" })
    } else {
        const refreshPayload = {
            sub: user.id,
            username: user.username
        };
        const payload = {
            sub: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.role,
        }
        const refreshToken = createRefreshToken(refreshPayload);
        const token = createToken(payload);
        // await usersService.saveRefreshToken(SQLRequestsS)(refreshToken, user.id);
        return res.status(200).send({ refreshToken, token, devMsg: "brao brat" })
    }
}
const usersController = express.Router();

usersController
    .post("/register", createValidator(createUserSchema), async (req, res) => {
        const { firstName, lastName, username, email, password } = req.body;
        const { err, user } = await usersService.createUser(SQLRequests)(
            firstName,
            lastName,
            username,
            email,
            password,
        );
        returnBothTokens(err, user, res);
    })

    .post("/login", createValidator(loginUserSchema), async (req, res) => {
        const { username, password } = req.body;
        const { err, user } = await usersService.loginUser(SQLRequests)(username, password);
        returnBothTokens(err, user, res);
    })



export default usersController