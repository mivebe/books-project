import SQLRequests from "../data/SQLRequests.js";
import { bookErrors, commentErrors } from "../errors/errors.js"

const getAllBooks = (SQLRequests) => async (search, category, limit, offset, role) => {
    if (role === "admin") {
        return await SQLRequests.retrieveAllBooks(search, category, limit || 20, offset || 0);
    } else {
        return await SQLRequests.retrieveAllListedBooks(search, category, limit || 20, offset || 0);
    }
}

const createBook = (SQLRequests) => async (cover, title, author, genre, publishdate, listed, copies, description) => {
    const errors = []
    const data = {}
    const messages = []

    const existingBook = await SQLRequests.getBookBySpecs(title, author, publishdate)
    if (existingBook) {
        errors.push(bookErrors.BOOK_ALREADY_EXISTS)
        data.book = existingBook
    } else {
        messages.push(bookErrors.BOOK_CREATION_SUCCESS)
        data.book = await SQLRequests.createBook(cover, title, author, genre, publishdate, listed, copies, description)
    }

    const existingAuthor = await SQLRequests.getAuthorByName(author)

    if (existingAuthor) {
        errors.push(bookErrors.AUTHOR_ALREADY_EXISTS)
        data.author = existingAuthor
    } else {
        messages.push(bookErrors.AUTHOR_CREATION_SUCCESS)
        data.author = await SQLRequests.createAuthor(author)
    }

    return {
        warnings: errors.length ? errors : null,
        data: data,
        messages: messages.length ? messages : null
    }
}
const getBook = (SQLRequests) => async (id, role) => {
    if (role === "admin") {
        return await SQLRequests.getAnyBookById(id)
    } else {
        return await SQLRequests.getBookById(id)
    }
}
const rentBook = (SQLRequests) => async (userId, bookId, userRole) => {
    const [book] = userRole === "admin" ?
        await SQLRequests.getAnyBookById(bookId)
        :
        await SQLRequests.getBookById(bookId)

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
const returnBook = (SQLRequests) => async (userId, bookId, userRole) => {
    const [book] = userRole === "admin" ?
        await SQLRequests.getAnyBookById(bookId)
        :
        await SQLRequests.getBookById(bookId)

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

const getBookComments = (SQLRequests) => async (bookId, userRole) => {
    const [book] = userRole === "admin" ?
        await SQLRequests.getAnyBookById(bookId)
        :
        await SQLRequests.getBookById(bookId)

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

const deleteBookComment = (SQLRequests) => async (userId, userRole, commentId) => {

    const [commentEntry] = await SQLRequests.getBookCommentById(commentId);
    if (!commentEntry) {
        return {
            err: commentErrors.COMMENT_DOES_NOT_EXIST,
            commentEntry: null
        }
    }

    if (userRole !== "admin" || commentEntry.users_id !== userId) {
        return {
            err: commentErrors.COMMENT_NOT_ACCESIBLE,
            commentEntry: null
        }
    }

    const deletedComment = await SQLRequests.deleteBookComment(commentId)
    return {
        err: null,
        commentEntry: deletedComment
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
const getPersonalRate = (SQLRequests) => async (userId, bookId, userRole) => {
    const [book] = userRole === "admin" ?
        await SQLRequests.getAnyBookById(bookId)
        :
        await SQLRequests.getBookById(bookId)

    if (!book) {
        return {
            err: bookErrors.INVALID_BOOK_ID,
            personalRate: null
        }
    }

    const [rateEntry] = await SQLRequests.getPersonalRate(userId, bookId)
    if (!rateEntry) {
        return {
            err: null,
            personalRate: null
        }
    }

    return {
        err: null,
        personalRate: rateEntry.rate
    }
}

const createBookRate = (SQLRequests) => async (userId, bookId, rate) => {
    if (rate < 0 || rate > 5) {
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

const getAnyBookRating = (SQLRequests) => async (bookId) => {
    const [book] = await SQLRequests.getAnyBookById(bookId);
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
    getAnyBookRating,
    getPersonalRate,
}