import SQLRequests from "../data/SQLRequests.js";
import { bookErrors, commentErrors } from "../errors/errors.js"

const getAllBooks = (SQLRequests) => async (search, limit, offset, role) => {
    console.log(limit);
    console.log(offset);
    if (role === "admin") {
        return await SQLRequests.retrieveAllBooks(search, limit || 20, offset || 0);
    } else {
        return await SQLRequests.retrieveAllListedBooks(search, limit || 20, offset || 0);
    }
}

const createBook = (SQLRequests) => async (cover, title, author, genre, publishdate, listed, copies, description) => {
    const [existingBook] = await SQLRequests.getBookBySpecs(title, author, publishdate)
    if (existingBook) {
        return {
            err: bookErrors.BOOK_ALREADY_EXISTS,
            book: existingBook,
        }
    }
    return {
        err: null,
        book: await SQLRequests.createBook(cover, title, author, genre, publishdate, listed, copies, description),
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

const getBookComments = (SQLRequests) => async (bookId) => {
    const [book] = await SQLRequests.getBookById(bookId);
    if (!book) {
        return {
            err: bookErrors.INVALID_BOOK_ID,
            comments: null
        }
    }

    const bookComments = await SQLRequests.getBookComments(bookId);

    return {
        err: null,
        comments: bookComments
    }
}

const createBookComment = (SQLRequests) => async (userId, bookId, comment) => {
    const [book] = await SQLRequests.getBookById(bookId);
    if (!book) {
        return {
            err: bookErrors.INVALID_BOOK_ID,
            commentEntry: null
        }
    }

    const [commentEntry] = await SQLRequests.createBookComment(userId, bookId, comment);

    return {
        err: null,
        commentEntry: commentEntry
    }

}

const deleteBookComment = (SQLRequests) => async (userId, bookId, commentId) => {
    const [book] = await SQLRequests.getBookById(bookId);
    if (!book) {
        return {
            err: bookErrors.INVALID_BOOK_ID,
            commentEntry: null
        }
    }

    const [commentEntry] = await SQLRequests.getBookCommentById(commentId);
    if (!commentEntry) {
        return {
            err: commentErrors.COMMENT_DOES_NOT_EXIST,
            commentEntry: null
        }
    }

    if (commentEntry.users_id !== userId) {
        return {
            err: commentErrors.COMMENT_NOT_ACCESIBLE,
            commentEntry: null
        }
    }

    await SQLRequests.deleteBookComment(commentId)
    return {
        err: null,
        commentEntry: commentEntry
    }
}

const getTraffic = (SQLRequests) => async () => {
    const [{ booksInUseCount }] = await SQLRequests.getBooksInUseCount();
    const mostRentedBooks = await SQLRequests.getMostRentedBooks();
    const mostRentedAuthors = await SQLRequests.getMostRentedAuthors();

    return {
        booksInUseCount,
        mostRentedBooks,
        mostRentedAuthors
    }
}

const createBookRate = (SQLRequests) => async (userId, bookId, rate) => {
    if (rate < 0 || rate > 10) {
        return {
            err: bookErrors.INVALID_BOOK_RATE,
            rateEntry: null
        }
    }

    const [book] = await SQLRequests.getBookById(bookId);
    if (!book) {
        return {
            err: bookErrors.INVALID_BOOK_ID,
            rateEntry: null
        }
    }

    const [rateEntry] = await SQLRequests.createBookRate(userId, bookId, rate);
    return {
        err: null,
        rateEntry: rateEntry
    }
}

const getBookRating = (SQLRequests) => async (bookId) => {
    const [book] = await SQLRequests.getBookById(bookId);
    if (!book) {
        return {
            err: bookErrors.INVALID_BOOK_ID,
            rating: null
        }
    }

    const fullRating = await SQLRequests.getBookRating(bookId)
    const rating = fullRating[0].rate || 0

    return {
        err: null,
        rating: rating
    }
}

export default {
    getAllBooks,
    createBook,
    getBook,
    rentBook,
    returnBook,
    updateBookVisibility,
    getBookComments,
    createBookComment,
    deleteBookComment,
    getTraffic,
    createBookRate,
    getBookRating,
}