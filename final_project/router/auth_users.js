const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    let matched_username = users.find((user) => user.username === username);
    if (matched_username)
        return false;
    else
        return true;
}

const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!(username && password)) {
        return res.status(300).json({ message: "Missing login info" });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    }
    else {
        console.log("incorrect login info");
        return res.status(300).json({ message: "Incorrect login info" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
    const comment = req.body.comment;

    let selected_book = Object.entries(books).find(([id, detail]) => id === isbn);

    if (selected_book) {
        selected_book[1]["reviews"][username] = comment;
        return res.send(JSON.stringify(selected_book), null, 4);
    }
    else {
        return res.status(200).json({ message: "no such book" });
    }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    let selected_book = Object.entries(books).find(([id, detail]) => id === isbn);

    if (selected_book) {
        delete selected_book[1]["reviews"][username];
        return res.send(JSON.stringify(selected_book), null, 4);
    }
    else {
        return res.status(200).json({ message: "no such book" });
    }

});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
