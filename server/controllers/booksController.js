import express from "express"
import SQLRequests from "../data/SQLRequests.js"
import booksService from "../services/books-service.js"
import { roleMiddleware } from "../auth/auth-middleware.js"
import { createValidator, createBookSchema, queryValidator, limitAndOffsetSchema, createCommentSchema } from "../validations/schemeNozzle.js"


const booksController = express.Router()

booksController
    .get("/", queryValidator(limitAndOffsetSchema), async (req, res) => {
        const { search, limit, offset } = req.query;
        const { role } = req.user;
        const books = await booksService.getAllBooks(SQLRequests)(search, limit, offset, role);

        res.status(200).send(books)
    })

    //homework research GUID, UUID

    .post("/", roleMiddleware("admin"), createValidator(createBookSchema), async (req, res) => {
        const { cover, title, author, genre, publishdate, listed, copies, description } = req.body
        const { err, book } = await booksService.createBook(SQLRequests)(
            cover,
            title,
            author,
            genre,
            publishdate,
            listed,
            copies,
            description
        );
        if (err) {
            return res.status(400).send({ msg: err, book })
        }

        res.status(200).send(book)
    })

    .get("/traffic", async (req, res) => {
        const traffic = await booksService.getTraffic(SQLRequests)();
        return res.status(200).send(traffic)
    })

    .get("/:id", async (req, res) => {
        const { id } = req.params;
        const { role } = req.user;
        const books = await booksService.getBook(SQLRequests)(id, role);

        res.status(200).send(books)
    })

    .post("/:id", async (req, res) => {
        const userId = req.user.id;
        const bookId = req.params.id;
        const { err, entry } = await booksService.rentBook(SQLRequests)(userId, bookId);
        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send(entry)
    })

    .delete("/:id", async (req, res) => {
        const userId = req.user.id;
        const bookId = req.params.id;
        const { err, entry } = await booksService.returnBook(SQLRequests)(userId, bookId);
        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send(entry)
    })

    .put("/:id", roleMiddleware("admin"), async (req, res) => {
        const bookId = req.params.id;
        const { err, book } = await booksService.updateBookVisibility(SQLRequests)(bookId);
        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send(book)
    })

    .get("/:id/comments", async (req, res) => {
        const bookId = req.params.id;
        const { err, comments } = await booksService.getBookComments(SQLRequests)(bookId);
        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send(comments)
    })

    .post("/:id/comments", createValidator(createCommentSchema), async (req, res) => {
        const userId = req.user.id;
        const bookId = req.params.id;
        const comment = req.body.comment;
        const { err, commentEntry } = await booksService.createBookComment(SQLRequests)(userId, bookId, comment);
        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send(commentEntry)
    })

    .delete("/:id/comments/:commentId", async (req, res) => {
        const userId = req.user.id;
        const bookId = req.params.id;
        const commentId = req.params.commentId;
        const { err, commentEntry } = await booksService.deleteBookComment(SQLRequests)(userId, bookId, commentId);
        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send(commentEntry)
    })

    .post("/:id/rate", async (req, res) => {
        const userId = req.user.id;
        const bookId = req.params.id;
        const rate = req.body.rate;
        const { err, rateEntry } = await booksService.createBookRate(SQLRequests)(userId, bookId, rate);

        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send(`You rated this book with ${rateEntry.rate}`)
    })

    .get("/:id/rating", async (req, res) => {
        const bookId = req.params.id;
        const role = req.user.role

        if (role === "admin") {
            const { err, rating } = await booksService.getAnyBookRating(SQLRequests)(bookId);
            if (err) {
                return res.status(400).send({ msg: err })
            }
            res.status(200).send({ rating })

        } else if (role === "user") {
            const { err, rating } = await booksService.getBookRating(SQLRequests)(bookId);
            if (err) {
                return res.status(400).send({ msg: err })
            }
            res.status(200).send({ rating })

        } else {
            return res.status(400).send({ msg: "Nonexistant user role" })
        }


    })


export default booksController