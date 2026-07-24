const express = require('express');
const axios = require('axios');

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
            return res.send("Register success with username: " + username);
        }
        else {
            return res.send("username already existed");
        }
    }
    else {
        return res.send("incomplete registration info");
    }
});


let cachedBooks = null; // make the books in the application level session
public_users.use(async function (req, res, next) {

    if (!cachedBooks) {
        try {
            let response = await axios.get('https://raw.githubusercontent.com/michaellau410/expressBookReviews/refs/heads/main/final_project/router/booksdb.json');
            cachedBooks = response.data;
        } catch (error) {
            return res.status(500).json({ message: "Failed to preload book database" });
        }
    }
    next();
});


// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    try {
        if (!cachedBooks) {
            let response = await axios.get('https://raw.githubusercontent.com/michaellau410/expressBookReviews/refs/heads/main/final_project/router/booksdb.json');
            cachedBooks = response.data;
        }
        return res.send(JSON.stringify(cachedBooks, null, 4));
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching book list" });
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    
    let isbn = req.params.isbn;
    try {
        if (!cachedBooks) {
            let response = await axios.get('https://raw.githubusercontent.com/michaellau410/expressBookReviews/refs/heads/main/final_project/router/booksdb.json');
            cachedBooks = response.data;
        }
        let selected_books = Object.entries(cachedBooks).filter(([id ,detail]) => id === isbn);
        return res.send(JSON.stringify(Object.fromEntries(selected_books), null, 4));
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching book list" });
    }
});


// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    
    let author = req.params.author.toLowerCase();
    try {
        if (!cachedBooks) {
            let response = await axios.get('https://raw.githubusercontent.com/michaellau410/expressBookReviews/refs/heads/main/final_project/router/booksdb.json');
            cachedBooks = response.data;
        }
        let selected_books = Object.entries(cachedBooks).filter(([id, detail]) => detail.author.toLowerCase() === author);
        return res.send(JSON.stringify(Object.fromEntries(selected_books), null, 4));
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching book list" });
    }
});


// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    
    let title = req.params.title.toLowerCase();
    try {
        if (!cachedBooks) {
            let response = await axios.get('https://raw.githubusercontent.com/michaellau410/expressBookReviews/refs/heads/main/final_project/router/booksdb.json');
            cachedBooks = response.data;
        }
        let selected_books = Object.entries(cachedBooks).filter(([id, detail]) => detail.title.toLowerCase() === title);
        return res.send(JSON.stringify(Object.fromEntries(selected_books), null, 4));
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching book list" });
    }
});


//  Get book review
public_users.get('/review/:isbn', async function (req, res) {
    
    let isbn = req.params.isbn;
    try {
        if (!cachedBooks) {
            let response = await axios.get('https://raw.githubusercontent.com/michaellau410/expressBookReviews/refs/heads/main/final_project/router/booksdb.json');
            cachedBooks = response.data;
        }
        let selected_books = Object.entries(cachedBooks).filter(([id, detail]) => id === isbn).map(([id, detail]) => detail.reviews);
        return res.send(JSON.stringify(Object.fromEntries(selected_books), null, 4));
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching book list" });
    }
});


module.exports.general = public_users;
