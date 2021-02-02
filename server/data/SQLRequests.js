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
const getBookById = async (id, listed = 1) => {
    const sql = ` SELECT * FROM books WHERE id = ? AND listed=?`;
    const bookInfo = await pool.query(sql, [id, listed]);
    return [...bookInfo]
}
const getBookBySpecs = async (title, author, publishdate) => {
    const sql = ` SELECT * FROM books WHERE title= ? AND author=? AND publishdate=?`;
    const bookInfo = await pool.query(sql, [title, author, publishdate]);
    return [...bookInfo]
}
const createBook = async (title, author, genre, description, publishdate, copies) => {
    const sql = `
INSERT INTO books(title, author, genre, description, publishdate, copies)
VALUE (?,?,?,?,?,?)
`;
    const { insertId } = await pool.query(sql, [title, author, genre, description, publishdate, copies]);
    const [book] = await getBookById(insertId);
    return await book
}
const getRegisterEntry = async (id) => {
    const sql = ` SELECT * FROM register WHERE id = ?`;
    const entryInfo = await pool.query(sql, [id]);
    return [...entryInfo]
}
const createRegisterEntry = async (userId, bookId, state = 1) => {
    const sql = `
INSERT INTO register(users_id, books_id, state)
VALUE (?,?,?)
`;
    const { insertId } = await pool.query(sql, [userId, bookId, state]);
    const [entry] = await getRegisterEntry(insertId);
    return await entry
}
const createInUseEntry = async (userId, bookId) => {
    const sql = `
INSERT INTO inuse(users_id, books_id)
VALUE (?,?)
`;
    await pool.query(sql, [userId, bookId]);
}
const getInUseByBookId = async (id) => {
    const sql = `
SELECT COUNT(books_id) AS count FROM inuse WHERE books_id=?;
`
    const inUseInfo = await pool.query(sql, [id]);
    return [...inUseInfo]
}
export default {
    retrieveAllListedBooks,
    retrieveUserFullInfoByUsername,
    retrieveUserFullInfoByEmail,
    createUser,
    createBook,
    getBookById,
    createRegisterEntry,
    getBookBySpecs,
    getInUseByBookId,
    createInUseEntry,
}
