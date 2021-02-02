import { bookErrors } from "../errors/errors.js"

const getAllBooks = (SQLRequests) => async (search) => {
    return await SQLRequests.retrieveAllListedBooks(search);
}

const createBook = (SQLRequests) => async (title, author, genre, description, publishdate, copies) => {
    const [existingBook] = await SQLRequests.getBookBySpecs(title, author, publishdate)
    if (existingBook) {
        return {
            err: bookErrors.BOOK_ALREADY_EXISTS,
            book: existingBook,
        }
    }
    return {
        err: null,
        book: await SQLRequests.createBook(title, author, genre, description, publishdate, copies),
    }
}
const getBook = (SQLRequests) => async (id) => {
    return await SQLRequests.getBookById(id)
}
const rentBook = (SQLRequests) => async (userId, bookId) => {
    const [book] = await SQLRequests.getBookById(bookId)

    if (!book) {
        return {
            err: bookErrors.INVALID_BOOK_ID,
            entry: null
        }
    }

    const [inUse] = await SQLRequests.getInUseByBookId(bookId)

    if (book.copies - inUse.count < 1) {
        return {
            err: bookErrors.NO_AVAILABLE_COPIES,
            entry: null,
        }
    }

    await SQLRequests.createInUseEntry(userId, bookId)

    return {
        err: null,
        entry: await SQLRequests.createRegisterEntry(userId, bookId, 1)
    }
}

export default {
    getAllBooks,
    createBook,
    getBook,
    rentBook
}