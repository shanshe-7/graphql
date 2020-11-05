import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queris';
import styled from 'styled-components';

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  text-decoration: none;
  height: 20px;
  width: 200px;
  font-size: 0.9em;
  border: 1px solid #dd2c00;
`;
const Select = styled.select`
  outline: none;
  text-decoration: none;
  height: 25px;
  width: 200px;
  border: 1px solid #dd2c00;
`;
const Option = styled.option`
  font-size: 1.1em;

  height: 20px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
  width: 350px;
`;

const Label = styled.label`
  padding-right: 10px;
  font-size: 1.1em;
`;

const Button = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.1em;
  padding: 5px;
  border-radius: 4px;
  background-color: #2196f3;
  color: white;
  :hover {
    background-color: #2962ff;
  }
`;
export default function AddBook() {
  const { loading, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation, {
    refetchQueries: [{ query: getBooksQuery }],
  });
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthorId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && genre && authorId)
      addBook({ variables: { name, genre, authorId } });
  };
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Form onSubmit={handleSubmit} id='add-book'>
          <InputDiv>
            <Label>Book Name:</Label>
            <Input type='text' onChange={handleNameChange} />
          </InputDiv>
          <InputDiv>
            <Label>Genre:</Label>
            <Input type='text' onChange={handleGenreChange} />
          </InputDiv>
          <InputDiv>
            <Label>Author:</Label>
            <Select onChange={handleAuthorChange}>
              <Option>Select Author</Option>
              {data.authors.map((i) => {
                return (
                  <Option key={i.id} value={i.id}>
                    {i.name}
                  </Option>
                );
              })}
            </Select>
          </InputDiv>
          <InputDiv>
            <Button>Add new book</Button>
          </InputDiv>
        </Form>
      )}
    </>
  );
}
