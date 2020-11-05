import { gql } from '@apollo/client';

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`;

export const getBookQuery = gql`
  {
    books {
      id
      name
      genre
      author {
        name
      }
    }
  }
`;

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;
