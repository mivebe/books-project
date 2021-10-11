import express from "express"
import fs from "fs"
import multer from "multer";
import SQLRequests from "../data/SQLRequests.js"
import booksService from "../services/books-service.js"
import { roleMiddleware } from "../auth/auth-middleware.js"
import { fileMiddleware } from "../auth/file-middleware.js"
import { createValidator, createBookSchema, queryValidator, limitAndOffsetSchema, createCommentSchema } from "../validations/schemeNozzle.js"



const booksController = express.Router()
const PROTOCOL = "http://"
const HOST = "localhost"
const PORT = 3001

booksController
    .get("/", queryValidator(limitAndOffsetSchema), async (req, res) => {
        const { search, category, limit, offset } = req.query;
        const { role } = req.user;
        const { books, total } = await booksService.getAllBooks(SQLRequests)(search, category, limit, offset, role);
        res.status(200).send({ books, total })
    })


    // .post("/", roleMiddleware("admin"), createValidator(createBookSchema), async (req, res) => {
    //     const { cover, title, author, genre, publishdate, listed, copies, description } = req.body
    //     const { err, data, messages } = await booksService.createBook(SQLRequests)(
    //         cover,
    //         title,
    //         author,
    //         genre,
    //         publishdate,
    //         listed,
    //         copies,
    //         description
    //     );

    //     res.status(200).send({ errors: err, data, messages })
    // })

    .post("/", roleMiddleware("admin"), createValidator(createBookSchema), async (req, res) => {
        const { cover, title, author, genre, publishdate, listed, copies, description } = req.body
        // console.log(cover);

        // fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFilename}`, () => {
        //     res.status(200).send({
        //         imageID: `${newFilename}`,
        //         imageURL: `${PROTOCOL}${HOST}:${PORT}/static/${newFilename}`,
        //         msg: "Image uploaded and renamed"
        //     });
        // })

        const { warnings, data, messages } = await booksService.createBook(SQLRequests)(
            cover,
            title,
            author,
            genre,
            publishdate,
            listed,
            copies,
            description
        );

        res.status(200).send({ warnings: warnings, data, messages })
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
        const userRole = req.user.role;
        const { err, entry } = await booksService.rentBook(SQLRequests)(userId, bookId, userRole);
        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send(entry)
    })

    .delete("/:id", async (req, res) => {
        const userId = req.user.id;
        const bookId = req.params.id;
        const userRole = req.user.role;
        const { err, entry } = await booksService.returnBook(SQLRequests)(userId, bookId, userRole);
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
        const userRole = req.user.role;
        const { err, comments } = await booksService.getBookComments(SQLRequests)(bookId, userRole);
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

    .delete("/comments/:commentId", async (req, res) => {
        const userId = req.user.id;
        const userRole = req.user.role
        const commentId = req.params.commentId;
        const { err, commentEntry } = await booksService.deleteBookComment(SQLRequests)(userId, userRole, commentId);
        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send(commentEntry)
    })

    .get("/:id/rate", async (req, res) => {
        const userId = req.user.id;
        const bookId = req.params.id;
        const userRole = req.user.role;
        const { err, personalRate } = await booksService.getPersonalRate(SQLRequests)(userId, bookId, userRole);
        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send({
            msg: `Your rating for this book is ${personalRate}`,
            rate: personalRate
        })
    })

    .post("/:id/rate", async (req, res) => {
        const userId = req.user.id;
        const bookId = req.params.id;
        const rate = req.body.rate;
        const { err, rateEntry } = await booksService.createBookRate(SQLRequests)(userId, bookId, rate);

        if (err) {
            return res.status(400).send({ msg: err })
        }
        res.status(200).send({
            msg: `You just rated this book with ${rateEntry.rate}`,
            rateEntry: rateEntry
        })
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

// .update("/:id/rate", async (req, res) => {
//     // const userId = req.user.id;
//     // const bookId = req.params.id;
//     // const rate = req.body.rate;
//     // const { err, rateEntry } = await booksService.createBookRate(SQLRequests)(userId, bookId, rate);

//     // if (err) {
//     //     return res.status(400).send({ msg: err })
//     // }
//     // res.status(200).send(`You rated this book with ${rateEntry.rate}`)
// })


export default booksController