import express from "express"
import SQLRequests from "../data/SQLRequests.js"
import booksService from "../services/books-service.js"
import { createValidator } from "../validations/validator-middleware.js"
import { bannedMiddleware } from "../auth/auth-middleware.js"

const booksController = express.Router()

booksController
    .get("/", async (req, res) => {
        const { search } = req.query;
        const books = await booksService.getAllBooks(SQLRequests)(search);

        res.status(200).send(books)
    })


export default booksController