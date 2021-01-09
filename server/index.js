import express from 'express'
import cors from 'cors';
import bodyParser from "body-parser"
import passport from "passport"
import helmet from "helmet"
import { jwtStrategy, refreshJwtStrategy } from "./auth/strategy.js";
import { authMiddleware, errorMiddleware } from "./auth/auth-middleware.js"
import usersController from "./controllers/usersController.js";
import booksController from "./controllers/booksController.js"

const PORT = 3001
const app = express();
passport.use("jwt", jwtStrategy);
passport.use("refresh", refreshJwtStrategy);

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());

app.use('/users', usersController);
app.use("/books", booksController);




app.get("/hui", async (req, res) => {
    console.log("hui is active");
    const hui = await SQLRequests.retrieveAllBooks();
    res.status(202).send({ hui })
})

// app.post("/register", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");

//     const fName = req.body.fName;
//     const lName = req.body.lName;
//     const regUsername = req.body.username;
//     const email = req.body.email;
//     const regPassword = req.body.password;

//     db.query(
//         "INSERT INTO users(username,password) VALUES (?,?)",
//         [fName, lName, regUsername, email, regPassword],
//         (err, result) => {
//             console.log(err);
//         })
// })

app.use((err, req, res, next) => {
    res.status(500).send({
        msg: "An unexpected error occurred, our developers are working hard to resolve it."
    });
});

app.all('*', (req, res) => {
    res.status(404).send({ msg: "Resource not found!" })
})

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
})