import { bookErrors } from "../errors/errors.js"

const getAllBooks = (SQLRequests) => async (search, limit, offset, role) => {
    console.log(limit);
    console.log(offset);
    if (role === "admin") {
        return await SQLRequests.retrieveAllBooks(search, limit || 20, offset || 0);
    } else {
        return await SQLRequests.retrieveAllListedBooks(search, limit || 20, offset || 0);
    }
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
const getBook = (SQLRequests) => async (id, role) => {
    if (role === "admin") {
        return await SQLRequests.getAnyBookById(id)
    } else {
        return await SQLRequests.getBookById(id)
    }
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
const returnBook = (SQLRequests) => async (userId, bookId) => {
    const [book] = await SQLRequests.getBookById(bookId)

    if (!book) {
        return {
            err: bookErrors.INVALID_BOOK_ID,
            entry: null
        }
    }

    //items are ordered by entering the database so the first oobject in the array is the earliest rented matching book
    const [firstRentedCopy] = await SQLRequests.getInUseByUser(userId, bookId)

    if (!firstRentedCopy) {
        return {
            err: bookErrors.NO_MATCHING_RENTED_BOOK,
            entry: null,
        }
    }

    await SQLRequests.deleteInUseEntry(firstRentedCopy.id)

    return {
        err: null,
        entry: await SQLRequests.createRegisterEntry(userId, bookId, 0)
    }
}

const updateBookVisibility = (SQLRequests) => async (bookId) => {
    const [book] = await SQLRequests.getAnyBookById(bookId);

    if (!book) {
        return {
            err: bookErrors.INVALID_BOOK_ID,
            book: null
        }
    }

    await SQLRequests.updateBookListed(bookId, book.listed ? 0 : 1)

    return {
        err: null,
        book: { ...book, listed: book.listed ? 0 : 1 }
    }
}

export default {
    getAllBooks,
    createBook,
    getBook,
    rentBook,
    returnBook,
    updateBookVisibility,
}