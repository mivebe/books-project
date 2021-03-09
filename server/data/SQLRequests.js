import pool from "./pool.js";

const retrieveAllListedBooks = async (search = "", limit = 20, offset = 0) => {
    const sql = ` SELECT b.*
    FROM books b
    WHERE b.listed = 1
    AND b.title LIKE '%${search}%'
    LIMIT ? OFFSET ?
    `;

    const res = await pool.query(sql, [search, +limit, +offset]);

    return [...res]

};
const retrieveAllBooks = async (search = "", limit = 20, offset = 0) => {
    const sql = ` SELECT b.*
    FROM books b
    WHERE b.title LIKE '%${search}%'
    LIMIT ? OFFSET ?
    `;

    const res = await pool.query(sql, [+limit, +offset]);

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

const getUserById = async (userId) => {
    const sql = ` SELECT * FROM users WHERE id = ?`;
    const userInfo = await pool.query(sql, [userId]);
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
const getAnyBookById = async (id) => {
    const sql = ` SELECT * FROM books WHERE id = ?`;
    const bookInfo = await pool.query(sql, [id]);
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

const getInUseByUser = async (userId, bookId) => {
    const sql = `
    SELECT * FROM inuse WHERE users_id=? AND books_id=?;
    `
    const inUseByUser = await pool.query(sql, [userId, bookId]);
    return [...inUseByUser];
}

const deleteInUseEntry = async (id) => {
    const sql = `
    DELETE FROM inuse WHERE id = ?;
    `
    await pool.query(sql, [id]);
}

const updateBookListed = async (bookId, changeTo) => {
    const sql = `
    UPDATE books SET listed = ? WHERE id = ?;
    `
    await pool.query(sql, [changeTo, bookId]);
}

const getBookComments = async (bookId) => {
    const sql = `
    SELECT c.*,u.username FROM comments c JOIN users u ON u.id=c.users_id WHERE books_id=?;
    `
    const bookComments = await pool.query(sql, [bookId])
    return bookComments
}

const getBookCommentById = async (commentId) => {
    const sql = `
    SELECT c.*,u.username FROM comments c JOIN users u ON u.id=c.users_id WHERE c.id=?;
    `
    const commentEntry = await pool.query(sql, [commentId])
    return [...commentEntry]
}

const createBookComment = async (userId, bookId, comment) => {
    const sql = `
    INSERT INTO comments(users_id, books_id, comment)
    VALUE (?,?,?);
    `
    const { insertId } = await pool.query(sql, [userId, bookId, comment])
    const commentEntry = await getBookCommentById(insertId)
    return [...commentEntry]
}

const deleteBookComment = async (commentId) => {
    const sql = `
    DELETE FROM comments WHERE id = ?;
    `
    await pool.query(sql, [commentId])
}

const getUserHistoryById = async (userId) => {
    const sql = `
    SELECT * FROM register WHERE users_id=?
    `
    const userHistory = await pool.query(sql, [userId])
    return [...userHistory]
}

export default {
    retrieveAllListedBooks,
    retrieveAllBooks,
    retrieveUserFullInfoByUsername,
    retrieveUserFullInfoByEmail,
    createUser,
    createBook,
    getBookById,
    createRegisterEntry,
    getBookBySpecs,
    getInUseByBookId,
    createInUseEntry,
    getInUseByUser,
    deleteInUseEntry,
    updateBookListed,
    getAnyBookById,
    getBookComments,
    createBookComment,
    getBookCommentById,
    deleteBookComment,
    getUserHistoryById,
    getUserById,
}
