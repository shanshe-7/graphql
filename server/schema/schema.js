const { gql } = require('apollo-server-express');
const Book = require('../models/bookModel');
const Author = require('../models/authorModel');

//schema
const schema = gql`
  type Query {
    books: [Book!]
    authors: [Author!]
    book(id: ID): [Book!]
  }

  type Mutation {
    createAuthor(name: String!, age: Int!): Author!
    addBook(name: String!, genre: String!, authorId: ID): Book!
  }

  type Book {
    id: ID!
    name: String!
    genre: String!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book!]!
  }
`;

// resolvers
const resolvers = {
  //query Resolvers
  Query: {
    books() {
      return Book.find({});
    },
    authors() {
      return Author.find({});
    },
  },

  //mutation resolvers
  Mutation: {
    createAuthor(_, args) {
      let author = new Author({
        name: args.name,
        age: args.age,
      });
      return author.save();
    },
    addBook(_, args) {
      let book = new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId,
      });

      return book.save();
    },
  },

  Book: {
    author(parent) {
      return Author.findById(parent.authorId);
    },
  },
  Author: {
    books(parent) {
      return Book.find({ authorId: parent.id });
    },
  },
};

module.exports = { schema, resolvers };
