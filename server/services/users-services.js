import bcrypt from "bcrypt";
import { userErrors } from "../errors/errors.js"

const saveRefreshToken = (data) => async (refreshToken, userId) => {
    return await data.insertRefreshToken(refreshToken, userId)
}
const refreshToken = (data) => async (username) => {
    return await data.retrieveUserFullInfo(username)
}
const createUser = (data) => async (firstName, lastName, username, email, password) => {
    const [existingUser] = await data.retrieveUserFullInfoByUsername(username);
    const [existingUser2] = await data.retrieveUserFullInfoByEmail(email);


    if (existingUser) {
        return {
            err: userErrors.DUPLICATE_USERNAME,
            user: null
        };
    }
    if (existingUser2) {
        return {
            err: userErrors.DUPLICATE_EMAIL,
            user: null
        };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const [user] = await data.createUser(firstName, lastName, username, email, passwordHash)
    return { err: null, user: user };
}

export default {
    refreshToken,
    saveRefreshToken,
    createUser,
}