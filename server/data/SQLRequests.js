import pool from "./pool.js";

const retrieveAllListedBooks = async (search = "") => {
    const sql = ` SELECT b.*
    FROM books b
    WHERE b.listed = 1
    AND b.title LIKE '%${search}%'
`;

    const res = await pool.query(sql);

    return [...res]

};
const retrieveUserFullInfoByUsername = async (username) => {
    const sql = ` SELECT u.*, r.role 
    FROM users AS u 
    JOIN roles AS r 
    ON u.roles_id = r.id 
    WHERE u.username = ? `;
    const userInfo = await pool.query(sql, [username]);
    return [...userInfo]
}
const retrieveUserFullInfoByEmail = async (email) => {
    const sql = ` SELECT * FROM users WHERE email = ?`;
    const userInfo = await pool.query(sql, [email]);
    return [...userInfo]
}
const createUser = async (firstName, lastName, username, email, password) => {
    const sql = `
INSERT INTO users(firstName, lastName, username, email, password)
VALUE (?,?,?,?,?)
`;
    await pool.query(sql, [firstName, lastName, username, email, password]);

    return await retrieveUserFullInfoByUsername(username);

}
export default {
    retrieveAllListedBooks,
    retrieveUserFullInfoByUsername,
    retrieveUserFullInfoByEmail,
    createUser,
}
