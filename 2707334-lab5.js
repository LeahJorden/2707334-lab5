
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data store
let books = [];

/*
GET /whoami
Returns your student number
*/
app.get('/whoami', (req, res) => {
    res.status(200).json({
        studentNumber: "2707334" // CHANGE THIS
    });
});

/*
GET /books
Returns all books
*/
app.get('/books', (req, res) => {
    res.status(200).json(books);
});

/*
GET /books/:id
Returns a specific book
*/
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
});

/*
POST /books
Creates a new book
*/
app.post('/books', (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newBook = {
        id,
        title,
        details: details || []
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

/*
PUT /books/:id
Updates a book
*/
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    if (req.body.title) {
        book.title = req.body.title;
    }

    res.status(200).json(book);
});

/*
DELETE /books/:id
Deletes a book
*/
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    books.splice(index, 1);

    res.status(200).json({ message: "Book deleted" });
});

/*
POST /books/:id/details
Adds a detail to a book
*/
app.post('/books/:id/details', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    const { id, author, genre, publicationYear } = req.body;

    const newDetail = {
        id,
        author,
        genre,
        publicationYear
    };

    book.details.push(newDetail);

    res.status(201).json(book);
});

/*
DELETE /books/:id/details/:detailId
Removes a specific detail
*/
app.delete('/books/:id/details/:detailId', (req, res) => {
    const book = books.find(b => b.id === req.params.id);

    if (!book) {
        return res.status(404).json({ error: "Book or detail not found" });
    }

    const detailIndex = book.details.findIndex(
        d => d.id === req.params.detailId
    );

    if (detailIndex === -1) {
        return res.status(404).json({ error: "Book or detail not found" });
    }

    book.details.splice(detailIndex, 1);

    res.status(200).json({ message: "Detail removed" });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});