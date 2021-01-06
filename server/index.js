import libraryData from "./library-data.js";

import express from 'express'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/hui", async (req, res) => {
    console.log("hui is active");
    const hui = await libraryData.retrieveAllBooks();
    res.status(202).send({ hui })
})

app.post("/register", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const fName = req.body.fName;
    const lName = req.body.lName;
    const regUsername = req.body.username;
    const email = req.body.email;
    const regPassword = req.body.password;

    db.query(
        "INSERT INTO users(username,password) VALUES (?,?)",
        [fName, lName, regUsername, email, regPassword],
        (err, result) => {
            console.log(err);
        })
})

app.listen(3001, () => {
    console.log("Server Running");
})