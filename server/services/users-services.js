import bcrypt from "bcrypt";
import { userErrors } from "../errors/errors.js"

const saveRefreshToken = (SQLRequests) => async (refreshToken, userId) => {
    return await SQLRequests.insertRefreshToken(refreshToken, userId)
}

const refreshToken = (SQLRequests) => async (username) => {
    return await SQLRequests.retrieveUserFullInfo(username)
}

const createUser = (SQLRequests) => async (firstName, lastName, username, email, password) => {
    const [existingUser] = await SQLRequests.retrieveUserFullInfoByUsername(username);
    const [existingEmail] = await SQLRequests.retrieveUserFullInfoByEmail(email);


    if (existingUser) {
        return {
            err: userErrors.DUPLICATE_USERNAME,
            user: null
        };
    }
    if (existingEmail) {
        return {
            err: userErrors.DUPLICATE_EMAIL,
            user: null
        };
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const [user] = await SQLRequests.createUser(firstName, lastName, username, email, passwordHash)
    return { err: null, user: user };
}

const loginUser = (SQLRequests) => async (username, password) => {
    const [user] = await SQLRequests.retrieveUserFullInfoByUsername(username);

    if (!user || !await bcrypt.compare(password, user.password)) {
        return {
            err: userErrors.INVALID_SIGNIN,
            user: null
        }
    }

    return {
        err: null,
        user: user
    }

}

const getUserHistoryById = (SQLRequests) => async (userId) => {
    const [user] = await SQLRequests.getUserById(userId);
    if (!user) {
        return {
            err: "EMI NEMA BATE",
            userHistory: null
        }
    }

    const userHistory = await SQLRequests.getUserHistoryById(userId)

    return {
        err: null,
        userHistory: userHistory
    }
}

export default {
    refreshToken,
    saveRefreshToken,
    createUser,
    loginUser,
    getUserHistoryById,
}