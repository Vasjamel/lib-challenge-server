const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    genre: String!
    description: String
    year: Int
    author: Author
  }

  type Author {
    id: ID!
    name: String!
    age: Int
    books: [Book]
  }

  type Query {
    books: [Book!]!
    authors: [Author!]!
    book(id: ID): Book!
    author(id: ID): Author!
  }

  input BookInput {
    title: String!
    genre: String!
    description: String
    year: Int
    author: ID
  }

  input AuthorInput {
    name: String!
    age: Int
    books: [ID]
  }

  type Mutation {
    createBook(book: BookInput): Book!
    deleteBook(bookId: ID): String
    createAuthor(author: AuthorInput): Author
    deleteAuthor(authorId: ID): String
  }
`

module.exports = typeDefs
