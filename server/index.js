import express from 'express';

import cors from 'cors';
import bodyParser from "body-parser";
import passport from "passport";
import helmet from "helmet";
import multer from "multer";
import fs from "fs"
import { jwtStrategy, refreshJwtStrategy } from "./auth/strategy.js";
import { authMiddleware, errorMiddleware } from "./auth/auth-middleware.js";
import usersController from "./controllers/usersController.js";
import booksController from "./controllers/booksController.js";


const PROTOCOL = "http://"
const HOST = "localhost"
const PORT = 3001
const app = express();

/** Login Authentication tokens */
passport.use("jwt", jwtStrategy);
passport.use("refresh", refreshJwtStrategy);

/** Multer and static endpoints initialization */
const upload = multer({ dest: "./uploads/" });
app.use("/static", express.static('./uploads'));

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());

/** Routing to controller layer */
app.use('/users', usersController, errorMiddleware);
app.use("/books", authMiddleware, booksController, errorMiddleware);

/** Image upload and renaming logic */
app.post("/uploadFile", upload.single("cover"), (req, res) => {
    const fileType = req.file.mimetype.split("/")[1];
    const newFilename = req.file.filename + "." + fileType;
    console.log("filetype:", fileType, "newfilename:", newFilename);

    fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFilename}`, () => {
        res.status(200).send({
            imageID: `${newFilename}`,
            imageURL: `${PROTOCOL}${HOST}:${PORT}/static/${newFilename}`,
            msg: "Image uploaded and renamed"
        });
    })
});

/** !!! DO NOT write endpoints after the app.all"*"  because they crash  #nohoistingforme !!! */

app.use((err, req, res, next) => {
    res.status(500).send({
        msg: "An unexpected error occurred, our developers are working hard to resolve it."
    });
});

app.all('*', (req, res) => {
    res.status(404).send({ msg: "Resource not found!" })
})

app.listen(PORT, HOST, () => {
    console.log(`Server Running on ${PROTOCOL}${HOST}:${PORT}/`);
})