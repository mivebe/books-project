import express from "express"
import SQLRequests from "../data/SQLRequests.js"
import booksService from "../services/books-service.js"
import { roleMiddleware } from "../auth/auth-middleware.js"
import { createValidator, createBookSchema, queryValidator, limitAndOffsetSchema } from "../validations/schemeNozzle.js"


const booksController = express.Router()

booksController
    .get("/", queryValidator(limitAndOffsetSchema), async (req, res) => {
        const { search, limit, offset } = req.query;
        const { role } = req.user;
        const books = await booksService.getAllBooks(SQLRequests)(search, limit, offset, role);

        res.status(200).send(books)
    })

    .post("/", roleMiddleware("admin"), createValidator(createBookSchema), async (req, res) => {
        const { title, author, genre, description, publishdate, copies } = req.body
        const { err, book } = await booksService.createBook(SQLRequests)(
            title,
            author,
            genre,
            description,
            publishdate,
            copies,
        );
        if (err) {
            return res.status(400).send({ msg: err, book })
        }

        res.status(200).send(book)
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

export default booksController