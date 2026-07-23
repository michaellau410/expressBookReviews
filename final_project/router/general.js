const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (isValid(username)) {
            users.push({ "username": username, "password": password });
            return res.send("registered username: " + username);
        }
        else {
            return res.send("username already existed");
        }
    }
    else {
        return res.send("incomplete registration info");
    }
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    let book_list = JSON.stringify(books, null, 4);
    return res.send(book_list);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    let selected_books = Object.entries(books).filter(([id, detail]) => id === isbn);
    return res.send(JSON.stringify(selected_books, null, 4));
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    let author = req.params.author.toLowerCase();
    let selected_books = Object.entries(books).filter(([id, detail]) => detail.author.toLowerCase() === author);
    return res.send(JSON.stringify(selected_books, null, 4));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    let title = req.params.title.toLowerCase();
    let selected_books = Object.entries(books).filter(([id, detail]) => detail.title.toLowerCase() === title);
    return res.send(JSON.stringify(selected_books, null, 4));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    let selected_books = Object.entries(books).filter(([id, detail]) => id === isbn).map(([id, detail]) => detail.reviews);
    return res.send(JSON.stringify(selected_books, null, 4));
});

module.exports.general = public_users;
