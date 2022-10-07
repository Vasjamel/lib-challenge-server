const Book = require("../Models/Book.model");
const Author = require("../Models/Author.model");

const resolvers = {
  Query: {
    books: async (parent, args) => {
      if (parent?.name) {
        console.log('parent', parent)
      }
      const books = await Book.find().populate("author");
      return books;
    },

    authors: async () => {
      return await Author.find().populate("books");
    },

    book: async (parent, args) => { 
      const book = await Book.findById(args.id).populate("author");
      return book;
    },

    author: async (parent, args) => {
      console.log('author start')
      const authorId = args.id || parent.author;
      console.log('author id', authorId);
      const author = await Author.findById(authorId).populate("books");
      return author;
    },
  },

  Mutation: {
    createBook: async (parent, args) => {
      const newBook = new Book(args.book);
      const savedBook = await newBook.save();
      const author = await Author.findById(newBook.author);
      author.books.push(savedBook.id);
      await author.save();
      return savedBook.populate("author");
    },

    deleteBook: async (parent, args) => {
      await Book.findByIdAndDelete(args.bookId);
      return `Book with id ${args.bookId} deleted!`;
    },

    createAuthor: async (parent, args) => {
      const newAuthor = new Author(args.author);
      await newAuthor.save();
      return newAuthor;
    },

    deleteAuthor: async (parent, args) => {
      await Author.findByIdAndDelete(args.authorId);
      return `Author ${args.authorId} deleted!`;
    },
  },
};

module.exports = resolvers;
